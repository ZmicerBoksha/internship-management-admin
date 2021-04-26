import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TCandidate } from '../../candidate_list/candidates_list';
import SaveIcon from '@material-ui/icons/Save';
import { TextField, Paper, Grid, Button, Typography, MenuItem, Switch } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_PATTERN = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const YEAR_PATTERN = /^(19|20)\d{2}$/;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      '& > svg': {
        margin: theme.spacing(3),
      },
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      alignItems: 'center',
      minHeight: '350px',
    },
    typography: {
      color: 'red',
    },
  }),
);

export type TSelect = {
  value: string;
  label: string;
};

type TCandidateInfoProps = {
  updateCandidateInfo: any;
  candidateInfo: TCandidate;
  editCandidateData: (data: any) => void;
  englishLevel: TSelect[];
  countriesList: TSelect[];
  mainSkill: TSelect[];
  preferredTime: TSelect[];
};

const CandidateInfo: React.FC<TCandidateInfoProps> = ({
  candidateInfo,
  englishLevel,
  countriesList,
  mainSkill,
  preferredTime,
  editCandidateData,
  updateCandidateInfo,
}) => {
  const classes = useStyles();
  const [active, setActive] = useState<boolean>(false);
  const errorMessageRequired = 'This field is required';
  const printErrorMessageMaxLength = (number: number) => `This field cannot exceed ${number} characters`;

  const handleChangeSwitcher = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  console.log(updateCandidateInfo);

  const defaultValues = {
    firstName: candidateInfo.firstName,
    lastName: candidateInfo.lastName,
    education: candidateInfo.education,
    email: candidateInfo.email,
    englishLevel: candidateInfo.englishLevel,
    experience: candidateInfo.experience,
    expertise: candidateInfo.expertise,
    location: candidateInfo.location,
    phone: candidateInfo.phone,
    skype: candidateInfo.skype,
  };

  const onSubmit = (data: TCandidate) => {
    editCandidateData(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCandidate>({
    defaultValues,
  });

  return (
    <>
      <Typography>Edit mode</Typography>
      <Switch
        checked={active}
        onChange={handleChangeSwitcher}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Candidate</h2>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      readOnly: !active,
                    }}
                    label="First name"
                    helperText={
                      (errors.firstName?.type === 'required' && errorMessageRequired) ||
                      (errors.firstName?.type === 'maxLength' && printErrorMessageMaxLength(20))
                    }
                    error={!!errors.firstName}
                  />
                )}
                name="firstName"
                control={control}
                rules={{ required: true, maxLength: 20 }}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true, maxLength: 20 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      readOnly: !active,
                    }}
                    label="Last name"
                    helperText={
                      (errors.lastName?.type === 'required' && errorMessageRequired) ||
                      (errors.lastName?.type === 'maxLength' && printErrorMessageMaxLength(20))
                    }
                    error={!!errors.lastName}
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Location</h2>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Country"
                    InputProps={{
                      readOnly: !active,
                    }}
                  >
                    {countriesList.map((option: TSelect) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="location"
                control={control}
              />
              <Controller
                name="location"
                control={control}
                rules={{ required: true, maxLength: 20 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    InputProps={{
                      readOnly: !active,
                    }}
                    label="City"
                    helperText={
                      (errors.location?.type === 'required' && errorMessageRequired) ||
                      (errors.location?.type === 'maxLength' && printErrorMessageMaxLength(20))
                    }
                    error={!!errors.location}
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Contacts</h2>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: true,
                  maxLength: 13,
                  pattern: PHONE_PATTERN,
                }}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    label="Phone"
                    {...field}
                    helperText={
                      (errors.phone?.type === 'required' && errorMessageRequired) ||
                      (errors.phone?.type === 'maxLength' && printErrorMessageMaxLength(13)) ||
                      (errors.phone?.type === 'pattern' && 'Check correct of phone number')
                    }
                    error={!!errors.phone}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: EMAIL_PATTERN,
                }}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    label="Email"
                    {...field}
                    helperText={
                      (errors.email?.type === 'required' && errorMessageRequired) ||
                      (errors.email?.type === 'pattern' && 'Check correct of email address')
                    }
                    error={!!errors.email}
                  />
                )}
              />
              <Controller
                name="skype"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    label="Skype"
                    {...field}
                    helperText={errors.skype?.type === 'required' && errorMessageRequired}
                    error={!!errors.skype}
                  />
                )}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Skills</h2>
              <Controller
                name="expertise"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Main skill"
                    InputProps={{
                      readOnly: !active,
                    }}
                  >
                    {mainSkill.map((option: TSelect) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    {...field}
                    label="Other Skills"
                  />
                )}
              />
              <Controller
                name="englishLevel"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="English level"
                    InputProps={{
                      readOnly: !active,
                    }}
                  >
                    {englishLevel.map((option: TSelect) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              {/*<Controller
                            name="cv"
                            control={control}
                            defaultValue={candidateInfo.cv}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: !active,
                                    }}
                                    {...field}
                                    label="CV"
                                />
                            }
                        />
                        {errors.cv &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }*/}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Education</h2>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    {...field}
                    label="Institution"
                    helperText={errors.education?.type === 'required' && errorMessageRequired}
                    error={!!errors.education}
                  />
                )}
              />
              {/*<Controller
                            name="education.faculty"
                            control={control}
                            defaultValue={candidateInfo.education.faculty}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: !active,
                                    }}
                                    {...field}
                                    label="Faculty"
                                />
                            }
                        />
                        {errors.education?.faculty &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        <Controller
                            name="education.speciality"
                            control={control}
                            defaultValue={candidateInfo.education.speciality}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: !active,
                                    }}
                                    {...field}
                                    label="Speciality"
                                />
                            }
                        />
                        {errors.education?.speciality &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        <Controller
                            name="graduation_date"
                            control={control}
                            defaultValue={candidateInfo.graduation_date}
                            rules={{
                                pattern: YEAR_PATTERN
                            }}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: !active,
                                    }}
                                    {...field}
                                    label="Graduation Date"
                                />
                            }
                        />
                        {errors.graduation_date?.type === 'pattern' &&
                        <Typography className={classes.typography} variant="subtitle2">Check correct of date
                            format</Typography>
                        }*/}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Other information</h2>
              {/* <TextField
                            required
                            select
                            label="Preferred time for interview"
                            InputProps={{
                                readOnly: !active,
                            }}
                            defaultValue={candidateInfo.time}
                        >
                            {preferredTime.map((option: TSelect) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>*/}
            </Paper>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
          {active && (
            <Button type="submit" variant="contained" color="primary" onClick={updateCandidateInfo && setActive(false)}>
              Save
              <SaveIcon fontSize="small" style={{ color: 'white' }} />
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default CandidateInfo;
