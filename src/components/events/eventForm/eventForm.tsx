import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { eventsApi, IEventForm } from '../../../api/api';
import { Countries } from '../../common/countries/countries';
import { Technologies } from '../../common/technologies/technologies';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Controller, useForm } from 'react-hook-form';
import { eventsRules } from '../rules/rules';
import { useHistory } from 'react-router';
import SnackbarInfo from '../../common/snackbarInfo/snackbarInfo';

const useStyles = makeStyles(() => {
  return createStyles({
    full_width: {
      width: '100%',
    },
    event_form: {
      marginTop: 25,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      border: '1px solid rgba(224, 224, 224, 1)',
      boxShadow: '5px -5px 20px rgb(0 0 0 / 20%)',
      borderRadius: 10,
      '& .left_side_form': {
        width: 'calc((100% - 140px) / 3 * 2)',
        padding: 35,
      },
      '& .right_side_form': {
        width: 'calc((100% - 140px) / 3)',
        padding: 35,
      },
      '& textarea': {
        resize: 'none',
      },
    },
    form_block_wrap: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 25,
      '&:last-child': {
        marginBottom: 0,
      },
      '& .title': {
        marginBottom: 15,
        '& h2': {
          fontSize: 28,
          fontWeight: 700,
        },
      },
      '& .date_field': {
        width: 250,
      },
    },
    input_wrap: {
      marginBottom: 15,
      width: '100%',
    },
    select_control: {
      minWidth: 250,
    },
    form_button_wrap: {
      padding: 35,
      paddingTop: 0,
    },
    choose_image: {
      maxWidth: '100%',
      display: 'block',
      marginBottom: 15,
    },
    help_text_for_choose_image: {
      marginLeft: 5,
    },
    error_field: {
      color: '#D90000',
      '& *': {
        color: '#D90000',
      },
    },
    disabled_field: {},
  });
});

type TEventForm = {
  eventId: string | undefined;
  eventType: 'new' | 'info';
  isEditMode: boolean;
  eventData: IEventForm | null;
  setLoadingData: (loadingData: boolean) => void;
  setIsEditMode: (isEditMode: boolean) => void;
};

const EventForm: FunctionComponent<TEventForm> = ({
  eventId,
  eventType,
  isEditMode,
  eventData,
  setLoadingData,
  setIsEditMode,
}) => {
  const classes = useStyles();

  const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info' | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const readOnly = eventType === 'new' ? false : !isEditMode;
  const history = useHistory();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    unregister,
    clearErrors,
    formState: { errors },
  } = useForm<IEventForm>();

  const watchShowFormat = watch('format');
  const watchTechnologies = watch('technologies');
  const watchSelectCountry = watch('country');
  const watchSelectImage = watch('image');
  const watchSelectDateStart = watch('startDate');
  const watchSelectDateOfEndAccept = watch('dateOfEndAccept');
  const watchSelectDeadline = watch('deadline');

  useEffect(() => {
    if (watchShowFormat === 'ONLINE' || eventData?.format === 'ONLINE') {
      unregister('country');
      unregister('city');
    }
  }, [watchShowFormat]);

  const onEventFormSubmit = (data: IEventForm) => {
    let technologyList: string[] = [];

    data.technologies &&
      data.technologies.split(',').forEach(item => {
        technologyList.push(item.trim());
      });
    data.technologies = technologyList.join(', ');

    data.duration = `${(+new Date(data.deadline) - +new Date(data.startDate)) / (60 * 60 * 24 * 1000)} days`;

    eventType === 'new' &&
      eventsApi
        .createEvent(data)
        .then(response => {
          const status = response.status;
          if (status >= 200 && status <= 299) {
            setopenSnackbar(true);
            setAlertSeverity('success');
            setAlertMessage('Event create success');
          }

          return response.data.id;
        })
        .then(newEventId => {
          setLoadingData(true);
          history.push(`/events/info/${newEventId}?mode=edit`);
        });

    eventType === 'info' &&
      eventId &&
      eventsApi
        .updateEvent(eventId, data)
        .then(response => {
          const status = response.status;
          if (status >= 200 && status <= 299) {
            setopenSnackbar(true);
            setAlertSeverity('success');
            setAlertMessage('Event update success');
          }

          return response.data.id;
        })
        .then(newEventId => {
          setIsEditMode(false);
          history.push(`/events/info/${newEventId}`);
        });
  };

  return (
    <>
      {openSnackbar && <SnackbarInfo isOpen={openSnackbar} alertSeverity={alertSeverity} alertMessage={alertMessage} />}
      <form className={classes.event_form} onSubmit={handleSubmit(onEventFormSubmit)}>
        <div className="left_side_form">
          <div className={classes.form_block_wrap}>
            <div className="title">
              <Typography component="h2">Main values</Typography>
            </div>
            <div className={classes.input_wrap}>
              <Controller
                name="title"
                control={control}
                defaultValue={eventData?.title}
                rules={{
                  required: true,
                  minLength: 5,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="title"
                      label="Title"
                      fullWidth
                      className={`${!!errors.title && classes.error_field} ${readOnly && classes.disabled_field}`}
                      variant="outlined"
                      disabled={readOnly}
                    />
                  );
                }}
              />
              {errors.title?.type === 'required' && (
                <Typography variant="overline" color="error">
                  {eventsRules.requiredtext()}
                </Typography>
              )}
              {errors.title?.type === 'minLength' && (
                <Typography variant="overline" color="error">
                  {eventsRules.minLenghtText(5)}
                </Typography>
              )}
            </div>
            <div className={classes.input_wrap}>
              <Controller
                name="description"
                control={control}
                defaultValue={eventData?.description}
                rules={{
                  required: true,
                  minLength: 20,
                }}
                render={({ field }) => {
                  return (
                    <TextareaAutosize
                      {...field}
                      id="description"
                      aria-label="Event description"
                      rowsMin={8}
                      placeholder="Enter event description text"
                      className={`${classes.full_width} ${!!errors.description && classes.error_field} ${
                        readOnly && classes.disabled_field
                      }`}
                      disabled={readOnly}
                    />
                  );
                }}
              />
              {errors.description?.type === 'required' && (
                <Typography variant="overline" color="error">
                  {eventsRules.requiredtext()}
                </Typography>
              )}
              {errors.description?.type === 'minLength' && (
                <Typography variant="overline" color="error">
                  {eventsRules.minLenghtText(20)}
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.form_block_wrap}>
            <div className="title">
              <Typography component="h2">Requirements</Typography>
            </div>
            <div className={classes.input_wrap}>
              <FormControl variant="outlined" className={classes.select_control}>
                <InputLabel id="englishLevel-label">English level</InputLabel>
                <Controller
                  name="englishLevel"
                  control={control}
                  defaultValue={eventData?.englishLevel || ''}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        id="englishLevel"
                        labelId="englishLevel-label"
                        label="English level"
                        className={`${!!errors.englishLevel && classes.error_field} ${
                          readOnly && classes.disabled_field
                        }`}
                        disabled={readOnly}
                      >
                        <MenuItem value={'BEGINNER'}>Beginner (A1)</MenuItem>
                        <MenuItem value={'ELEMENTARY'}>Elementary (A2)</MenuItem>
                        <MenuItem value={'PRE_INTERMEDIATE'}>Pre-Intermediate (A2/B1)</MenuItem>
                        <MenuItem value={'INTERMEDIATE'}>Intermediate (B1)</MenuItem>
                        <MenuItem value={'UPPER_INTERMEDIATE'}>Upper-Intermediate (B2)</MenuItem>
                        <MenuItem value={'ADVANCED'}>Advanced (C1)</MenuItem>
                        <MenuItem value={'PROFICIENCY'}>Proficiency (C2)</MenuItem>
                      </Select>
                    );
                  }}
                />
                {errors.englishLevel?.type === 'required' && (
                  <Typography variant="overline" color="error">
                    {eventsRules.requiredtext()}
                  </Typography>
                )}
              </FormControl>
            </div>
            <div className={classes.input_wrap}>
              <Controller
                name="technologies"
                control={control}
                defaultValue={eventData?.technologies || ''}
                rules={{
                  required: true,
                }}
                render={() => {
                  return (
                    <Autocomplete
                      multiple
                      options={Technologies}
                      getOptionLabel={option => option}
                      defaultValue={eventData?.technologies.split(',').map(technology => technology.trim())}
                      onChange={(event, data) => {
                        setValue('technologies', data.join(', '));
                      }}
                      getOptionSelected={(option, value) => option === value}
                      className={`${!!errors.technologies && classes.error_field} ${
                        readOnly && classes.disabled_field
                      }`}
                      disabled={readOnly}
                      renderInput={params => <TextField {...params} label="Technologies" variant="outlined" />}
                    />
                  );
                }}
              />
              {watchTechnologies === '' && (
                <Typography variant="overline" color="error">
                  {eventsRules.requiredtext()}
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.form_block_wrap}>
            <div className="title">
              <Typography component="h2">Dates info</Typography>
            </div>
            <div className={classes.input_wrap}>
              <Controller
                name="startDate"
                control={control}
                defaultValue={eventData?.startDate}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="startDate"
                      label="Event start"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className={`date_field ${!!errors.startDate && classes.error_field} ${
                        readOnly && classes.disabled_field
                      }`}
                      disabled={readOnly}
                    />
                  );
                }}
              />
              {errors.startDate?.type === 'required' && (
                <Typography variant="overline" color="error" display="block">
                  {eventsRules.requiredtext()}
                </Typography>
              )}
            </div>
            {(watchSelectDateStart || eventData?.startDate) && (
              <div className={classes.input_wrap}>
                <Controller
                  name="deadline"
                  control={control}
                  defaultValue={eventData?.deadline}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        id="deadline"
                        label="Event finish (deadline)"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className={`date_field ${!!errors.deadline && classes.error_field} ${
                          readOnly && classes.disabled_field
                        }`}
                        disabled={readOnly}
                      />
                    );
                  }}
                />
                {errors.deadline?.type === 'required' && (
                  <Typography variant="overline" color="error" display="block">
                    {eventsRules.requiredtext()}
                  </Typography>
                )}
                {new Date(watchSelectDeadline) <= new Date(watchSelectDateStart) && (
                  <Typography variant="overline" color="error" display="block">
                    Finish date must be large than start date
                  </Typography>
                )}
              </div>
            )}
            {((watchSelectDateStart &&
              watchSelectDeadline &&
              new Date(watchSelectDeadline) > new Date(watchSelectDateStart)) ||
              (eventData?.startDate && eventData.deadline)) && (
              <div className={classes.input_wrap}>
                <Controller
                  name="dateOfEndAccept"
                  control={control}
                  defaultValue={eventData?.dateOfEndAccept}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        id="dateOfEndAccept"
                        label="Date end of asseptin"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        className={`date_field ${!!errors.dateOfEndAccept && classes.error_field} ${
                          readOnly && classes.disabled_field
                        }`}
                        disabled={readOnly}
                      />
                    );
                  }}
                />
                {errors.dateOfEndAccept?.type === 'required' && (
                  <Typography variant="overline" color="error" display="block">
                    {eventsRules.requiredtext()}
                  </Typography>
                )}
                {(new Date(watchSelectDateOfEndAccept) < new Date(watchSelectDateStart) ||
                  new Date(watchSelectDateOfEndAccept) >= new Date(watchSelectDeadline)) && (
                  <Typography variant="overline" color="error" display="block">
                    Date end of asseptin must be between start and finish dates
                  </Typography>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="right_side_form">
          <div className={classes.form_block_wrap}>
            <div className="title">
              <Typography component="h2">Event custom info</Typography>
            </div>
            <div className={classes.input_wrap}>
              <FormControl variant="outlined" className={classes.select_control}>
                <InputLabel id="tab-label">Tab</InputLabel>
                <Controller
                  name="eventTab"
                  control={control}
                  defaultValue={eventData?.eventTab || ''}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        labelId="tab-label"
                        id="tab"
                        label="Tab"
                        className={`${!!errors.eventTab && classes.error_field} ${readOnly && classes.disabled_field}`}
                        disabled={readOnly}
                      >
                        <MenuItem value={'PLANNED'}>Planned</MenuItem>
                        <MenuItem value={'IN_PROGRESS'}>In-progress</MenuItem>
                        <MenuItem value={'ARCHIVE'}>Archive</MenuItem>
                      </Select>
                    );
                  }}
                />
                {errors.eventTab?.type === 'required' && (
                  <Typography variant="overline" color="error">
                    {eventsRules.requiredtext()}
                  </Typography>
                )}
              </FormControl>
            </div>
            <div className={classes.input_wrap}>
              <FormControl variant="outlined" className={classes.select_control}>
                <InputLabel id="format-label">Format</InputLabel>
                <Controller
                  name="format"
                  control={control}
                  defaultValue={eventData?.format || ''}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        labelId="format-label"
                        id="format"
                        label="Format"
                        className={`${!!errors.format && classes.error_field} ${readOnly && classes.disabled_field}`}
                        disabled={readOnly}
                      >
                        <MenuItem value={'ONLINE'}>Online</MenuItem>
                        <MenuItem value={'OFFLINE'}>Offline</MenuItem>
                      </Select>
                    );
                  }}
                />
                {errors.format?.type === 'required' && (
                  <Typography variant="overline" color="error">
                    {eventsRules.requiredtext()}
                  </Typography>
                )}
              </FormControl>
            </div>
          </div>
          {(watchShowFormat === 'OFFLINE' || eventData?.format === 'OFFLINE') && (
            <div className={classes.form_block_wrap} data-name="location-info">
              <div className="title">
                <Typography component="h2">Location info (for offline event)</Typography>
              </div>
              <div className={classes.input_wrap}>
                <Controller
                  name="country"
                  control={control}
                  defaultValue={eventData?.country || ''}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        options={Countries}
                        getOptionLabel={option => option}
                        onChange={(event, data) => field.onChange(data)}
                        className={`${!!errors.country && classes.error_field} ${readOnly && classes.disabled_field}`}
                        disabled={readOnly}
                        renderInput={params => <TextField {...params} label="Choose a country" variant="outlined" />}
                      />
                    );
                  }}
                />
                {errors?.country?.type === 'required' && (
                  <Typography variant="overline" color="error">
                    {eventsRules.requiredtext()}
                  </Typography>
                )}
              </div>
              {(watchSelectCountry || eventData?.country) && (
                <div className={classes.input_wrap}>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={eventData?.city || ''}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          id="city"
                          label="City"
                          fullWidth
                          variant="outlined"
                          className={`${!!errors.city && classes.error_field} ${readOnly && classes.disabled_field}`}
                          disabled={readOnly}
                        />
                      );
                    }}
                  />
                  {errors?.city?.type === 'required' && (
                    <Typography variant="overline" color="error">
                      {eventsRules.requiredtext()}
                    </Typography>
                  )}
                </div>
              )}
            </div>
          )}
          <div className={classes.form_block_wrap}>
            <div className="title">
              <Typography component="h2">Image info</Typography>
            </div>
            <div className={classes.input_wrap}>
              {watchSelectImage && (
                <img src={URL.createObjectURL(watchSelectImage.imageData)} alt="" className={classes.choose_image} />
              )}
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                className={`${readOnly && classes.disabled_field}`}
                disabled={readOnly}
              >
                Upload image
                <input
                  type="file"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const imageFile = event.target.files?.length && event.target.files[0];
                    imageFile && imageFile.name.match(/\.(jpg|jpeg|png|gif|ico)$/)
                      ? setValue('image.imageData', imageFile)
                      : alert('Ошибка, нужна картинка');
                  }}
                  hidden
                />
              </Button>
              <Typography variant="caption" className={classes.help_text_for_choose_image}>
                {(watchSelectImage && watchSelectImage.imageData.name) || 'Please select image.'}
              </Typography>
            </div>
            {watchSelectImage && (
              <div className={classes.input_wrap}>
                <Controller
                  name="image.altText"
                  control={control}
                  defaultValue={eventData?.image?.altText}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        id="alt_for_image"
                        label="Description image"
                        fullWidth
                        variant="outlined"
                        className={`${readOnly && classes.disabled_field}`}
                        disabled={readOnly}
                      />
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className={classes.form_button_wrap}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={eventId ? <UpdateIcon /> : <SaveIcon />}
          >
            {eventId ? 'Update event' : 'Add new event'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
