import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { employeeServer } from '../../../../api/api';
import { TCandidate, TEmployee } from '../../../../types/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Context } from '../candidate_card';

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
};

const CandidateInterview: React.FC<CandidateInterviewProps> = ({ candidateInfo }) => {
  const classes = useStyles();
  const errorMessageRequired = 'This field is required';
  const [hr, setHr] = useState<TEmployee[]>([]);
  const [ts, setTs] = useState<TEmployee[]>([]);
  const { handleNextStep } = useContext(Context);

  const onSubmitHr = (data: TCandidate) => {
    console.log(data);
  };
  const onSubmitTs = (data: TCandidate) => {
    console.log(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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

  return (
    <>
      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.typography}>
              HR interview
            </Typography>
            <form className={classes.container} onSubmit={handleSubmit(onSubmitHr)}>
              <Controller
                name="date"
                control={control}
                defaultValue={''}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="datetime-local"
                      label="Interview date"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
              <Controller
                name="time"
                control={control}
                defaultValue={''}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField {...field} id="time" label="Time slots" type="text" className={classes.textField} />
                  );
                }}
              />
              <Controller
                name="time"
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
                onClick={() => handleNextStep?.(1)}
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
              <Controller
                name="date"
                control={control}
                defaultValue={''}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      id="datetime-local"
                      label="Interview date"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
              <Controller
                name="time"
                control={control}
                defaultValue={''}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField {...field} id="time" label="Time slots" type="text" className={classes.textField} />
                  );
                }}
              />
              <Controller
                name="time"
                control={control}
                defaultValue={''}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField {...field} id="time" label="TS List" type="text" className={classes.textField} select>
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
                onClick={() => handleNextStep?.(3)}
              >
                Approve
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default CandidateInterview;
