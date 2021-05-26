import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { employeeServer } from '../../../../api/api';
import { TCandidate, TEmployee } from '../../../../types/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Context } from '../candidate_card';
import { watch } from 'fs';
import { COUNTRY_LIST, GET, POST, PREFIX, PUT, TIME_SLOTS_BACKEND_FORMAT } from '../../../../constants';
import useAxios from 'axios-hooks';
import { getSlots } from '../../../staff/timeSlots/api';
import moment from 'moment';
import { getCandidateById, getCandidateIdByEmpolee, getStatusCandidateById } from '../../../staff/candidateTrello/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      alignItems: 'center',
      minHeight: '200px',
    },
    typography: {
      fontSize: '20px',
      fontWeight: 700,
      marginBottom: '20px',
    },
    button: {
      marginTop: '20px',
    },
  }),
);

type CandidateInterviewProps = {
  candidateInfo: TCandidate;
  setSlots: any;
  time: any;
};

const CandidateInterview: React.FC<CandidateInterviewProps> = ({ candidateInfo, setSlots, time }) => {
  const classes = useStyles();
  const errorMessageRequired = 'This field is required';
  const [hr, setHr] = useState<TEmployee[]>([]);
  const [ts, setTs] = useState<TEmployee[]>([]);
  const { handleNextStep } = useContext(Context);

  const [{ data, loading, error, response }, sendRequest] = useAxios(
    {
      method: GET,
    },
    { manual: true },
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmitHr = (data: any) => {
    console.log(moment(data.time).format(TIME_SLOTS_BACKEND_FORMAT))
    sendRequest(
      {
        url: `${PREFIX}interviewtime`,
        method: POST,
        data: {
          beginDate: data.time,
          cnId: window.location.href.split('/').slice(-1)[0],
          empId:watchTsEmployee,
          evId: 8
        },
      },
    );
  };

  const onSubmitTs = (data: any) => {
    console.log(data)
    sendRequest(
      {
        url: `${PREFIX}interviewtime`,
        method: POST,
        data: {
          beginDate: moment(data.date).format(TIME_SLOTS_BACKEND_FORMAT),
          cnId: window.location.href.split('/').slice(-1)[0],
          empId:watchTsEmployee,
          evId: 1
        },
      },
    );
  };

  useEffect(() => {
    employeeServer
      .getHrEmployees()
      .then(({ data: { content } }) => {
        setHr(content);
      })
      .catch(err => {
        console.log(err);
      });

    employeeServer
      .getTsEmployees(candidateInfo.mainSkill)
      .then(({ data: { content } }) => {
        setTs(content);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const watchHR = watch('hr');
  const watchTsEmployee = watch('tsEmployee');




  useEffect(() => {
    sendRequest({
      url: `${PREFIX}employees/${watchTsEmployee}/crossing/${candidateInfo.id}`,
    });
    setSlots(data?.suitableTimeSlots || []);

  }, [watchHR]);


  useEffect(() => {
    async function getData() {
      if (watchTsEmployee) {
        await getSlots(watchTsEmployee).then(response => {
          response.map((item: any) => {
            item.start = new Date(item.dateTime);
            item.end = moment(item.start).add(30, 'm').toDate();
            delete item.dateTime;
          });
          setSlots(response);

        });
      }
    }
    getData();


    // setSlots(data?.suitableTimeSlots||[])
    //console.log(data.suitableTimeSlots)
  }, [watchTsEmployee]);


  return (
    <Grid container spacing={3} style={{ marginBottom: '40px' }}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h3" className={classes.typography}>
            HR interview
          </Typography>
          <form className={classes.container} onSubmit={handleSubmit(onSubmitHr)}>
            <Controller
              name="time"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={time}
              render={({ field }) => {
                return (
            <TextField id="time" name="time" InputProps={{ readOnly: true }} value={time} />   );
              }}
                />
            <Controller
              name="hr"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue=""
              render={({ field }) => {
                return (
                  <TextField {...field} id="time" label="HR List" type="text" className={classes.textField} select>
                    {hr.map((option: TEmployee) => (
                      <MenuItem key={option.id} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}

            >
              Approve
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h3" className={classes.typography}>
            TS interview
          </Typography>
          <form className={classes.container} onSubmit={handleSubmit(onSubmitTs)}>
            <TextField id="data" name="date" InputProps={{ readOnly: true }} value={time} />
            <Controller
              name="tsEmployee"
              control={control}
              defaultValue={''}
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <TextField {...field} id="tsEmployee" label="TS List" type="text" className={classes.textField}
                             select>
                    {ts.map((option: TEmployee) => (
                      <MenuItem key={option.id} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Approve
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CandidateInterview;
