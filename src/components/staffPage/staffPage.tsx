import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
import CandidateTrello from '../candidateTrello/candidateTrello';
import {
  COUNTRY_LIST,
  PREFIX,
  PHONE_PATTERN,
  REQUIRED__ERROR__MESSAGE,
  MAX__LENGTH__ERROR__MESSAGE,
  MAX__LENGTH,
  ADD_PATH,
  POST,
  PUT,
} from '../../constants';

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
  let history = useHistory();
  let [edit, setEdit] = useState(false);
  let [addMode, setAddMode] = useState(false);

  const createUrl = useParams<IUrl>();

  useEffect(() => {
    createUrl.add === 'add' && setAddMode(true);
  }, []);
  console.log(createUrl.add);

  const classes = useStyles();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const watchCountry = watch('empLocationCountry');

  useEffect(() => {
    const timeZone = COUNTRY_LIST.get(watchCountry);
    if (Array.isArray(timeZone)) {
      setValue('empTimezone', timeZone[0]);
    }
  }, [watchCountry]);

  const [{ data: putData, loading: putLoading, error: putError }, sendRequest] = useAxios(
    {
      url: `${PREFIX}employees/${window.location.href.split('/').slice(-1)[0]}`,
      method: 'PUT',
    },
    { manual: true },
  );

  const [{ data, loading, error }, refetch] = useAxios(`${PREFIX}employees/1`);

  let staffData = addMode ? '' : data;

  const onSubmit = (data: any) => {

    // @ts-ignore
      addMode? history.push('/staff/hr') &&
        sendRequest({
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
        {edit && <Button variant="contained">Save</Button> }
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
                    name="empFirstName"
                    control={control}
                    defaultValue={staffData?.empFirstName}
                    rules={{
                      required: true,
                      maxLength: MAX__LENGTH,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          required={edit}
                          error={errors.empFirstName}
                          helperText={
                            (errors.empFirstName?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                            (errors.empFirstName?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
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
                    name="empLastName"
                    control={control}
                    defaultValue={staffData?.empLastName}
                    rules={{
                      required: true,
                      maxLength: MAX__LENGTH,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          helperText={
                            (errors.empLastName?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                            (errors.empLastName?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                          }
                          required={edit}
                          error={errors.empLastName}
                          {...field}
                          id="empLastName"
                          label="Last name:"
                          InputProps={{ readOnly: !edit }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item spacing={2} alignItems="center">
                  <FormControl className={classes.formControl} disabled={!edit}>
                    <InputLabel id="empLocationCountry">Country</InputLabel>
                    <Controller
                      name="empLocationCountry"
                      control={control}
                      defaultValue={staffData?.empLocationCountry || Array.from(COUNTRY_LIST.keys())[0]}
                      render={({ field }) => {
                        return (
                          <Select {...field} labelId="empLocationCountry" id="empLocationCountry">
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
                      <InputLabel id="empTimezone">Time zone</InputLabel>
                      <Controller
                        name="empTimezone"
                        control={control}
                        defaultValue={staffData?.empTimezone}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => {
                          return (
                            <Select error={errors.empTimezone} {...field} labelId="empTimezone" id="empTimezone">
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
                      name="empTimezone"
                      control={control}
                      defaultValue={staffData?.empTimezone}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            id="timeZone"
                            label="Time zone:"
                            InputProps={{ readOnly: true }}
                            value={COUNTRY_LIST.get(watchCountry) || staffData?.empTimezone}
                          />
                        );
                      }}
                    />
                  )}

                  <Controller
                    name="empLocationCity"
                    control={control}
                    defaultValue={staffData?.empLocationCity}
                    rules={{
                      required: true,
                      maxLength: MAX__LENGTH,
                    }}
                    render={({ field }) => {
                      return (
                        <TextField
                          required={edit}
                          error={errors.empLocationCity}
                          helperText={
                            (errors.empLocationCity?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                            (errors.empLocationCity?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                          }
                          {...field}
                          id="empLocationCity"
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
                  name="empPhone"
                  control={control}
                  defaultValue={staffData?.empPhone}
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
                        id="empPhone"
                        InputProps={{ readOnly: !edit }}
                        error={errors.empPhone}
                        required={edit}
                      >
                        <InputMask mask="(0)999 999 99 99" />
                      </TextField>
                    );
                  }}
                />
                <Controller
                  name="empSkype"
                  control={control}
                  defaultValue={staffData?.empSkype}
                  rules={{
                    required: true,
                    maxLength: MAX__LENGTH,
                  }}
                  render={({ field }) => {
                    return (
                      <TextField
                        required={edit}
                        error={errors.empSkype}
                        helperText={
                          (errors.empSkype?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                          (errors.empSkype?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                        }
                        {...field}
                        id="empSkype"
                        label="Skype:"
                        InputProps={{ readOnly: !edit }}
                      />
                    );
                  }}
                />
                <Controller
                  name="roleId"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => {
                    return <TextField {...field} id="roleId" label="roleId:" InputProps={{ readOnly: !edit }} />;
                  }}
                />
              </Grid>
              <Controller
                name="empEmail"
                control={control}
                defaultValue={staffData?.empEmail}
                render={({ field }) => {
                  return (
                    <TextField
                      required={edit}
                      error={errors.empEmail}
                      helperText={
                        (errors.empEmail?.type === 'required' && REQUIRED__ERROR__MESSAGE) ||
                        (errors.empEmail?.type === 'maxLength' && MAX__LENGTH__ERROR__MESSAGE(MAX__LENGTH))
                      }
                      {...field}
                      id="empEmail"
                      label="Email:"
                      InputProps={{ readOnly: !edit }}
                    />
                  );
                }}
              />
            </Paper>
          </Grid>
          <input type="submit" />
        </Grid>
      </form>
      {!addMode && <CandidateTrello timeZon={staffData?.empTimezone} />}
    </Grid>
  );
};
export default StaffPage;
