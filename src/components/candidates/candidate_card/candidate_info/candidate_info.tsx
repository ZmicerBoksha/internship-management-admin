import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TCandidate, TResume } from "../../../../types/types";
import SaveIcon from '@material-ui/icons/Save';
import { TextField, Paper, Grid, Button, Typography, MenuItem, Switch } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { COUNTRIES_LIST, ENGLISH_LEVELS, MAIN_SKILL, PHONE_PATTERN, EMAIL_PATTERN } from '../../../common/const/const';
import { resumeServer } from "../../../../api/api";

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

type TCandidateInfoProps = {
  updateCandidateInfo: any;
  candidateInfo: TCandidate;
  editCandidateData: (data: TCandidate) => void;
};

const CandidateInfo: React.FC<TCandidateInfoProps> = ({ candidateInfo, editCandidateData, updateCandidateInfo }) => {
  const classes = useStyles();
  const [active, setActive] = useState<boolean>(false);
  const errorMessageRequired = 'This field is required';
  const printErrorMessageMaxLength = (number: number) => `This field cannot exceed ${number} characters`;

  const handleChangeSwitcher = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  const [candidateResume, setCandidateResume] = useState<any>({});

  useEffect(() => {
    resumeServer.getResume(candidateInfo.rsmId)
      .then(({data}) => {
      setCandidateResume(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [candidateInfo]);

  const defaultValues = {
    firstName: candidateInfo.firstName,
    lastName: candidateInfo.lastName,
    institution: candidateInfo.institution,
    faculty: candidateInfo.faculty,
    speciality: candidateInfo.speciality,
    email: candidateInfo.email,
    englishLevel: candidateInfo.englishLevel,
    otherSkills: candidateInfo.otherSkills,
    mainSkill: candidateInfo.mainSkill,
    country: candidateInfo.country,
    city: candidateInfo.city,
    phone: candidateInfo.phone,
    skype: candidateInfo.skype,
    graduationDate: new Date(candidateInfo.graduationDate).getFullYear(),
    resume: candidateResume.link,
  };

  const onSubmit = (data: TCandidate) => {
    editCandidateData(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
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
                    {COUNTRIES_LIST.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                name="country"
                control={control}
              />
              <Controller
                name="city"
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
                      (errors.city?.type === 'required' && errorMessageRequired) ||
                      (errors.city?.type === 'maxLength' && printErrorMessageMaxLength(20))
                    }
                    error={!!errors.city}
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
                name="mainSkill"
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
                    {MAIN_SKILL.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller
                name="otherSkills"
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
                    {ENGLISH_LEVELS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <TextField
                InputProps={{
                  readOnly: !active,
                }}
                label="Resume"
                defaultValue={candidateResume.link}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h2 className="card__form-title">Education</h2>
              <Controller
                name="institution"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    {...field}
                    label="Institution"
                  />
                )}
              />
              <Controller
                name="faculty"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    {...field}
                    label="Faculty"
                  />
                )}
              />
              <Controller
                name="speciality"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    {...field}
                    label="Speciality"
                  />
                )}
              />
              <Controller
                name="graduationDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    InputProps={{
                      readOnly: !active,
                    }}
                    {...field}
                    label="Graduation date"
                  />
                )}
              />
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
                            {PREFERRED_TIME.map((option: TSelect) => (
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
