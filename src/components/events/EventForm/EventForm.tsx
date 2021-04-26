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
  Typography } from "@material-ui/core";
import { 
  ChangeEvent, 
  FunctionComponent, 
  useEffect, 
  useState } from "react";
import { useParams } from "react-router";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { 
  eventsApi, 
  IEventForm } from "../../../api/api";
import { Countries } from "../../common/Countries/Countries";
import { Technologies } from "../../common/Technologies/Technologies";
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { 
  Controller, 
  useForm } from "react-hook-form";
import Preloader from "../../common/Preloader/Preloader";
import { eventsRules } from "../Rules/Rules";

const useStyles = makeStyles(() => {
  return createStyles({
    pageWrap: {
      position: 'relative',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35
    },
    page_title: {
      fontSize: 38,
      fontWeight: 700
    },
    full_width: {
      width: '100%'
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
        resize: 'none'
      }
    },
    form_block_wrap: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 25,
      '&:last-child': {
        marginBottom: 0
      },
      '& .title': {
        marginBottom: 15,
        '& h2': {
          fontSize: 28,
          fontWeight: 700
        }
      },
      '& .date_field': {
        width: 250,
      }
    },
    input_wrap: {
      marginBottom: 15,
      width: '100%'
    },
    select_control: {
      minWidth: 250,
    },
    form_button_wrap: {
      padding: 35,
      paddingTop: 0
    },
    choose_image: {
      maxWidth: '100%',
      display: 'block',
      marginBottom: 15
    }
  })
});

interface IUrl {
  eventId: string | undefined,
  eventFormType: 'add' | 'update'
};

interface IEventData {
  id?: number,
  eventTab: string,
  format: 'ONLINE ' | 'OFFLINE',
  eventTitle: string,
  eventBody: string,
  startDate: Date,
  deadline: Date,
  dateOfEndAccept?: Date,
  duration: string,
  image: {
    altText: string,
    imageData: any
  },
  englishLevel: string,
  technologies: string,
  country?: string,
  city?: string,
  creatorEvent: {
    createdAt: Date
  }
};

const EventForm: FunctionComponent = () => {
  const classes = useStyles();
  const { eventId, eventFormType } = useParams<IUrl>();

  const [loadingData, setLoadingData] = useState<Boolean>(true);
  const [eventData, setEventData] = useState<IEventData | null>(null);

  async function getEventData(id: string) {
    await eventsApi.getEventInfo(id)
      .then((response) => {
        setEventData(response);
        setLoadingData(false);
      });
  }
  
  const { control, watch, handleSubmit, setValue, formState: {errors} } = useForm<IEventForm>();  
  const watchShowFormat = watch('format');
  const watchTechnologies = watch('technologies');
  const watchSelectCountry = watch('location.country');
  const watchSelectImage = watch('imageInfo');
  const watchSelectDateStart = watch('startDate');
  const watchSelectDateEndOfAsseptin = watch('dateEndOfAsseptin');
  const watchSelectFinishDate = watch('finishDate');
  
  useEffect(() => {
    // loadingData && eventFormType === 'update' && eventId && getEventData(eventId);
    // loadingData && eventFormType === 'add' && setLoadingData(false);   

    switch (eventFormType) {
      case 'update':
        eventId && getEventData(eventId);
        break;
      case 'add':
        setLoadingData(false);
        break;
      default:
        break;
    }
  }, []);


  const onEventFormSubmit = (data: IEventForm) => {    
    let technologyList: string[] = [];
    
    data.technologies && data.technologies.split(',').forEach((item) => {
      technologyList.push(item.trim());
    });  
    data.technologies = technologyList.join(', ');

    data.duration = `${(+new Date(data.finishDate) - +new Date(data.startDate)) / (60 * 60 * 24 * 1000)} days`;
    
    debugger;
    
    eventFormType === 'add' && eventsApi.createEvent(data);
    eventFormType === 'update' && eventId && eventsApi.updateEvent(eventId, data);
    
  };

  return (
    <>
      {
        loadingData ?
          <Preloader /> :
          <div className={classes.pageWrap}>
            <Typography component="h1" className={classes.page_title}>
              {eventId ? `Edit event (id = ${eventData!.id})` : `Add event`}
            </Typography>
            <form className={classes.event_form} onSubmit={handleSubmit(onEventFormSubmit)}>
              <div className='left_side_form'>
                {/* ---------------  // ---------------- */}
                <div className={classes.form_block_wrap}>
                  <div className='title'>
                    <Typography component="h2">Main values</Typography>
                  </div>
                  <div className={classes.input_wrap}>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={eventData?.eventTitle}
                      rules={
                        { 
                          required: true,
                          minLength: 5
                        }
                      }
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            id="title"
                            label="Title"
                            fullWidth
                            variant="outlined"
                          />
                        )
                      }}
                    />
                    {errors.title?.type === 'required' && (
                      <Typography variant="overline" color='error'>
                        {eventsRules.requiredtext()}
                      </Typography>
                    )}
                    {errors.title?.type === 'minLength' && (
                      <Typography variant="overline" color='error'>
                        {eventsRules.minLenghtText(5)}
                      </Typography>
                    )}
                  </div>
                  <div className={classes.input_wrap}>
                    <Controller
                      name="body"
                      control={control}
                      defaultValue={eventData?.eventBody}
                      rules={
                        { 
                          required: true,
                          minLength: 20
                        }
                      }
                      render={({ field }) => {
                        return (
                          <TextareaAutosize
                            {...field}
                            id='body'
                            aria-label="Body event"
                            rowsMin={8}
                            placeholder="Enter event body text"
                            className={classes.full_width}
                          />
                        )
                      }}
                    />
                    {errors.body?.type === 'required' && (
                     <Typography variant="overline" color='error'>
                       {eventsRules.requiredtext()}
                     </Typography>
                    )}
                    {errors.body?.type === 'minLength' && (
                     <Typography variant="overline" color='error'>
                       {eventsRules.minLenghtText(20)}
                     </Typography>
                    )}
                  </div>
                </div>

                {/* ---------------  // ---------------- */}
                <div className={classes.form_block_wrap}>
                  <div className='title'>
                    <Typography component="h2">Requirements</Typography>
                  </div>
                  <div className={classes.input_wrap}>
                    <FormControl variant="outlined" className={classes.select_control}>
                      <InputLabel id="englishLevel-label">English level</InputLabel>
                      <Controller
                        name="englishLevel"
                        control={control}
                        defaultValue={eventData?.englishLevel || ''}
                        rules={
                          { 
                            required: true
                          }
                        }
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              id="englishLevel"
                              labelId="englishLevel-label"
                              label="English level"
                            >
                              {/* <MenuItem value={'It doesn`t matter'}>It doesn`t matter</MenuItem> */}
                              <MenuItem value={'BEGINNER'}>Beginner (A1)</MenuItem>
                              <MenuItem value={'ELEMENTARY'}>Elementary (A2)</MenuItem>
                              <MenuItem value={'PRE_INTERMEDIATE'}>Pre-Intermediate (A2/B1)</MenuItem>
                              <MenuItem value={'INTERMEDIATE'}>Intermediate (B1)</MenuItem>
                              <MenuItem value={'UPPER_INTERMEDIATE'}>Upper-Intermediate (B2)</MenuItem>
                              <MenuItem value={'ADVANCED'}>Advanced (C1)</MenuItem>
                              <MenuItem value={'PROFICIENCY'}>Proficiency (C2)</MenuItem>
                            </Select>
                          )
                        }}
                      />
                      {errors.englishLevel?.type === 'required' && (
                       <Typography variant="overline" color='error'>
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
                      rules={
                        { 
                          required: true
                        }
                      }
                      render={ 
                        () => {
                          return (
                            <Autocomplete
                              multiple
                              options={Technologies}
                              getOptionLabel={option => option}
                              defaultValue={eventData?.technologies.split(',').map(technology => technology.trim())}
                              onChange={
                                (event, data) => {
                                  setValue("technologies", data.join(', '));
                                }
                              }
                              getOptionSelected={(option, value) => option === value}      
                              renderInput={(params) => (
                                <TextField 
                                  {...params} 
                                  label="Technologies" 
                                  variant="outlined"   
                                />  
                              )}
                            />
                          )
                        }                        
                      }
                    />
                    {(watchTechnologies === '') && (
                     <Typography variant="overline" color='error'>
                       {eventsRules.requiredtext()}
                     </Typography>
                    )}
                  </div>
                </div>

                {/* ---------------  // ---------------- */}
                <div className={classes.form_block_wrap}>
                  <div className='title'>
                    <Typography component="h2">Dates info</Typography>
                  </div>
                  <div className={classes.input_wrap}>
                    <Controller
                      name="startDate"
                      control={control}
                      defaultValue={eventData?.startDate}                      
                      rules={
                        { 
                          required: true
                        }
                      }
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
                            className={'date_field'}
                          />
                        )
                      }}
                    />
                    {errors.startDate?.type === 'required' && (
                     <Typography variant="overline" color='error' display='block'>
                       {eventsRules.requiredtext()}
                     </Typography>
                    )}
                  </div>
                  {
                    (watchSelectDateStart || eventData?.startDate) &&                 
                    <div className={classes.input_wrap}>
                    <Controller
                      name="finishDate"
                      control={control}
                      defaultValue={eventData?.deadline}              
                      rules={
                        { 
                          required: true,
                        }
                      }
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            id="finishDate"
                            label="Event finish"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            className={'date_field'}
                          />
                        )
                      }}
                    />
                    {errors.finishDate?.type === 'required' && (
                     <Typography variant="overline" color='error' display='block'>
                       {eventsRules.requiredtext()}
                     </Typography>
                    )}
                    {new Date(watchSelectFinishDate) <= new Date(watchSelectDateStart) && (
                     <Typography variant="overline" color='error' display='block'>
                       Finish date must be large than start date
                     </Typography>
                    )}
                  </div>
                  }
                  {
                    (watchSelectDateStart && watchSelectFinishDate && (new Date(watchSelectFinishDate) > new Date(watchSelectDateStart)) || eventData?.startDate && eventData?.deadline) &&
                    <div className={classes.input_wrap}>
                      <Controller
                        name="dateEndOfAsseptin"
                        control={control}
                        defaultValue={eventData?.dateOfEndAccept}              
                        rules={
                          { 
                            required: true
                          }
                        }
                        render={({ field }) => {
                          return (
                            <TextField
                              {...field}
                              id="dateEndOfAsseptin"
                              label="Date end of asseptin"
                              variant="outlined"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              className={'date_field'}
                            />
                          )
                        }}
                      />
                      {errors.dateEndOfAsseptin?.type === 'required' && (
                       <Typography variant="overline" color='error' display='block'>
                         {eventsRules.requiredtext()}
                       </Typography>
                      )}
                      {
                        (new Date(watchSelectDateEndOfAsseptin) < new Date(watchSelectDateStart) || 
                        new Date(watchSelectDateEndOfAsseptin) >= new Date(watchSelectFinishDate)) && (
                       <Typography variant="overline" color='error' display='block'>
                         Date end of asseptin must be between start and finish dates
                       </Typography>
                      )}
                    </div>
                  }
                </div>
              </div>
              <div className='right_side_form'>
                {/* ---------------  // ---------------- */}
                <div className={classes.form_block_wrap}>
                  <div className='title'>
                    <Typography component="h2">Event custom info</Typography>
                  </div>
                  <div className={classes.input_wrap} >
                    <FormControl variant="outlined" className={classes.select_control}>
                      <InputLabel id="tab-label">Tab</InputLabel>
                      <Controller
                        name="eventTab"
                        control={control}
                        defaultValue={eventData?.eventTab || ''} 
                        rules={
                          { 
                            required: true
                          }
                        }
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              labelId="tab-label"
                              id="tab"
                              label="Tab"
                            >
                              <MenuItem value={'PLANNED'}>Planned</MenuItem>
                              <MenuItem value={'IN_PROGRESS'}>In-progress</MenuItem>
                              <MenuItem value={'ARCHIVE'}>Archive</MenuItem>
                            </Select>
                          )
                        }}
                      />
                      {errors.eventTab?.type === 'required' && (
                       <Typography variant="overline" color='error'>
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
                        rules={
                          { 
                            required: true
                          }
                        }
                        render={({ field }) => {
                          return (
                            <Select
                              {...field}
                              labelId="format-label"
                              id="format"
                              label="Format"
                            >
                              <MenuItem value={'ONLINE'}>Online</MenuItem>
                              <MenuItem value={'OFFLINE'}>Offline</MenuItem>
                            </Select>
                          )
                        }}
                      />
                      {errors.format?.type === 'required' && (
                       <Typography variant="overline" color='error'>
                         {eventsRules.requiredtext()}
                       </Typography>
                      )}
                    </FormControl>
                  </div>
                </div>
                {/* ---------------  // ---------------- */}
                {
                  (watchShowFormat === 'OFFLINE' || eventData?.format === 'OFFLINE') &&
                  <div className={classes.form_block_wrap} data-name='location-info'>
                    <div className='title'>
                      <Typography component="h2">Location info (for offline event)</Typography>
                    </div>
                    <div className={classes.input_wrap}>
                      <Controller 
                        name="location.country"
                        control={control}
                        defaultValue={eventData?.country || ''}
                        rules={
                          { 
                            required: true
                          }
                        }
                        render={({ field }) => {
                          return (                      
                            <Autocomplete
                              {...field}
                              options={Countries}
                              getOptionLabel={option => option}
                              onChange={(event, data) => field.onChange(data)}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Choose a country"
                                  variant="outlined"
                                />
                              )}
                            />
                          )
                        }}
                      />
                      {(errors.location?.country?.type === 'required') && (
                       <Typography variant="overline" color='error'>
                         {eventsRules.requiredtext()}
                       </Typography>
                      )}
                    </div>
                    {
                      (watchSelectCountry || eventData?.country) &&
                      <div className={classes.input_wrap}>                        
                        <Controller
                          name="location.city"
                          control={control}
                          defaultValue={eventData?.city}
                          rules={
                            { 
                              required: true
                            }
                          }
                          render={({ field }) => {
                            return (
                              <TextField
                                {...field}
                                id="city"
                                label="City"
                                fullWidth
                                variant="outlined"
                              />
                            )
                          }}
                        />
                        {errors.location?.city?.type === 'required' && (
                         <Typography variant="overline" color='error'>
                           {eventsRules.requiredtext()}
                         </Typography>
                        )}
                      </div>
                    }
                  </div>
                }
                {/* ---------------  // ---------------- */}
                <div className={classes.form_block_wrap}>
                  <div className='title'>
                    <Typography component="h2">Image info</Typography>
                  </div>
                  <div className={classes.input_wrap}>
                    {
                      watchSelectImage &&
                      <img src={URL.createObjectURL(watchSelectImage.imageData)} alt='' className={classes.choose_image} />
                    }
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload image
                      <input
                        type="file"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          if (event.target.files?.length) {
                            setValue('imageInfo.imageData', event.target.files[0]);
                          }
                        }}
                        hidden
                      />
                    </Button>
                    {
                      watchSelectImage &&
                      <div>
                        {watchSelectImage.imageData.name}
                      </div>
                    }
                  </div>
                  {
                    watchSelectImage &&
                    <div className={classes.input_wrap}>                   
                      <Controller
                        name="imageInfo.altText"
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
                            />  
                          )
                        }}
                      />
                    </div>
                  }
                </div>
              </div>
              <div className={classes.form_button_wrap}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type='submit'
                  startIcon={eventId ? <UpdateIcon /> : <SaveIcon />}
                >
                  {eventId ? 'Update event' : 'Add new event'}
                </Button>
              </div>
            </form>
          </div>
      }
    </>
  )
}

export default EventForm;
