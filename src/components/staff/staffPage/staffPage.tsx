import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import TimeSlots from '../timeSlots/timeSlots';
import {
  Button,
  createStyles,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Switch,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router';
import './staffPageStyle.scss';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputMask from 'react-input-mask';
import {
  COUNTRY_LIST,
  PREFIX,
  PHONE_PATTERN,
  REQUIRED__ERROR__MESSAGE,
  MAX__LENGTH__ERROR__MESSAGE,
  MAX__LENGTH,
  ROLE_NAME,
  POST,
  PUT,
} from '../../../constants';
import CandidateTrello from '../candidateTrello/candidateTrello';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface IUrl {
  add?: string;
}

const StaffPage: React.FC = () => {
  let history: any = useHistory();
  let [edit, setEdit] = useState(false);
  let [addMode, setAddMode] = useState(false);

  const createUrl = useParams<IUrl>();

  useEffect(() => {
    createUrl.add === 'add' && setAddMode(true);
  }, []);

  const classes = useStyles();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const watchCountry = watch('locationCountry');

  useEffect(() => {
    const timeZone = COUNTRY_LIST.get(watchCountry);
    if (Array.isArray(timeZone)) {
      setValue('timezone', timeZone[0]);
    }
  }, [watchCountry]);

  let staffId = addMode ? '1' : window.location.href.split('/').slice(-1)[0];

  const [{ data: putData, loading: putLoading, error: putError }, sendRequest] = useAxios(
    {
      url: `${PREFIX}employees/${window.location.href.split('/').slice(-1)[0]}`,
      method: 'PUT',
    },
    { manual: true },
  );

  const [{ data, loading, error }, refetch] = useAxios(`${PREFIX}employees/${staffId}`);

  let staffData = addMode ? '' : data;

  const onSubmit = (data: any) => {
    addMode
      ? sendRequest({
          data: data,
          method: POST,
          url: `${PREFIX}employees`,
        })
      : sendRequest({
          data: data,
          method: PUT,
          url: `${PREFIX}employees/${window.location.href.split('/').slice(-1)[0]}`,
        });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <Grid container spacing={3}>
      <Grid className="row" container xs={12} alignItems="center">
        <Typography className="title" variant="h4" noWrap>
          {window.location.href.split('/').slice(-2)[0]} page
        </Typography>
        <FormControlLabel
          control={<Switch checked={edit} onChange={() => setEdit(!edit)} name="checkedA" color="primary" />}
          label=""
        />
        <Typography variant="h6" className="switchLabel" noWrap>
          Edit mode
        </Typography>
        {edit && <Button variant="contained">Save</Button>}
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justify="center" xs={12}>
          <Grid item xs={6} spacing={2}>
            <Typography className="subtitle" variant="h5" noWrap>
              Details
            </Typography>
            <Paper>
              <Grid container spacing={2} alignItems="center">
                <Grid item spacing={2} alignItems="center">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={staffData?.firstName}
                    rules={{
                      required: true,
                      maxLength: MAX__LENGTH,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          required={edit}
                          error={errors.firstName}
                          helperText={
                            (errors.firstName?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                            (errors.firstName?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                          }
                          {...field}
                          id="firstName"
                          label="First name:"
                          InputProps={{ readOnly: !edit }}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={staffData?.lastName}
                    rules={{
                      required: true,
                      maxLength: MAX__LENGTH,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          helperText={
                            (errors.lastName?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                            (errors.lastName?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                          }
                          required={edit}
                          error={errors.lastName}
                          {...field}
                          id="lastName"
                          label="Last name:"
                          InputProps={{ readOnly: !edit }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item spacing={2} alignItems="center">
                  <FormControl className={classes.formControl} disabled={!edit}>
                    <InputLabel id="locationCountry">Country</InputLabel>
                    <Controller
                      name="locationCountry"
                      control={control}
                      defaultValue={staffData?.locationCountry || Array.from(COUNTRY_LIST.keys())[0]}
                      render={({ field }) => {
                        return (
                          <Select {...field} labelId="locationCountry" id="locationCountry">
                            {Array.from(COUNTRY_LIST.keys()).map(country => (
                              <MenuItem value={country}>{country}</MenuItem>
                            ))}
                          </Select>
                        );
                      }}
                    />
                  </FormControl>
                  {watchCountry === 'US' || watchCountry === 'Russia' ? (
                    <FormControl className={classes.formControl} disabled={!edit}>
                      <InputLabel id="timezone">Time zone</InputLabel>
                      <Controller
                        name="timezone"
                        control={control}
                        defaultValue={staffData?.timezone}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => {
                          return (
                            <Select error={errors.timezone} {...field} labelId="timezone" id="timezone">
                              {Array.from(COUNTRY_LIST.get(watchCountry)).map((timeZone: any) => (
                                <MenuItem value={timeZone}>{timeZone}</MenuItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                    </FormControl>
                  ) : (
                    <Controller
                      name="timezone"
                      control={control}
                      defaultValue={staffData?.timezone}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            id="timeZone"
                            label="Time zone:"
                            InputProps={{ readOnly: true }}
                            value={COUNTRY_LIST.get(watchCountry) || staffData?.timezone}
                          />
                        );
                      }}
                    />
                  )}

                  <Controller
                    name="locationCity"
                    control={control}
                    defaultValue={staffData?.locationCity}
                    rules={{
                      required: true,
                      maxLength: MAX__LENGTH,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          required={edit}
                          error={errors.locationCity}
                          helperText={
                            (errors.locationCity?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                            (errors.locationCity?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                          }
                          {...field}
                          id="locationCity"
                          label="City:"
                          InputProps={{ readOnly: !edit }}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Typography className="subtitle" variant="h5" noWrap>
              Contacts
            </Typography>
            <Paper>
              <Grid>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={staffData?.phone}
                  rules={{
                    required: true,
                    maxLength: MAX__LENGTH,
                    pattern: PHONE_PATTERN,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        label="Phone:"
                        {...field}
                        id="phone"
                        InputProps={{ readOnly: !edit }}
                        error={errors.phone}
                        required={edit}
                      >
                        <InputMask mask="(0)999 999 99 99" />
                      </TextField>
                    );
                  }}
                />
                <Controller
                  name="skype"
                  control={control}
                  defaultValue={staffData?.skype}
                  rules={{
                    required: true,
                    maxLength: MAX__LENGTH,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required={edit}
                        error={errors.skype}
                        helperText={
                          (errors.skype?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                          (errors.skype?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                        }
                        {...field}
                        id="skype"
                        label="Skype:"
                        InputProps={{ readOnly: !edit }}
                      />
                    );
                  }}
                />
                <Controller
                  name="type"
                  control={control}
                  defaultValue={staffData?.type || 'HR'}
                  rules={{
                    required: true,
                    maxLength: MAX__LENGTH,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required={edit}
                        error={errors.type}
                        helperText={
                          (errors.type?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                          (errors.type?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                        }
                        {...field}
                        id="type"
                        label="type:"
                        InputProps={{ readOnly: !edit }}
                      />
                    );
                  }}
                />
                {edit || addMode ? (
                  <FormControl className={classes.formControl} disabled={!edit}>
                    <InputLabel id="roleId">Role</InputLabel>
                    <Controller
                      name="roleId"
                      control={control}
                      defaultValue={staffData?.role?.id}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => {
                        return (
                          <Select error={errors.timezone} {...field} labelId="role" id="roleId">
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Super Admin</MenuItem>
                            <MenuItem value={3}>Employee</MenuItem>
                          </Select>
                        );
                      }}
                    />
                  </FormControl>
                ) : (
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={staffData?.role?.name}
                    render={({ field }) => {
                      return <TextField {...field} id="role" label="role:" InputProps={{ readOnly: !edit }} />;
                    }}
                  />
                )}
              </Grid>
              <Controller
                name="email"
                control={control}
                defaultValue={staffData?.email}
                render={({ field }) => {
                  return (
                    <TextField
                      required={edit}
                      error={errors.email}
                      helperText={
                        (errors.email?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                        (errors.email?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                      }
                      {...field}
                      id="email"
                      label="Email:"
                      InputProps={{ readOnly: !edit }}
                    />
                  );
                }}
              />
            </Paper>
          </Grid>
          {edit || addMode ? <input type="submit" /> : ''}
        </Grid>
      </form>
      {!addMode && <TimeSlots />}
    </Grid>
  );
};
export default StaffPage;
