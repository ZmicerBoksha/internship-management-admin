import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TCandidate } from '../../candidate_list/candidates_list';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { TextField, Paper, Grid, Button, Typography, MenuItem } from '@material-ui/core';
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
            minHeight: '350px'
        },
        typography: {
            color: 'red'
        }
    }),
);

export type TSelect = {
    value: string,
    label: string
}

type TCandidateInfoProps = {
    candidateInfo: TCandidate,
    englishLevel: TSelect[],
    countriesList: TSelect[],
    mainSkill: TSelect[],
    preferredTime: TSelect[]
}

const CandidateInfo: React.FC<TCandidateInfoProps> = ({
    candidateInfo,
    englishLevel,
    countriesList,
    mainSkill,
    preferredTime
}) => {
    const [active, setActive] = useState<boolean>(true);
    const classes = useStyles();
    const onSubmit = (data: TCandidate) => console.log(data);
    const {handleSubmit, control, formState: {errors}} = useForm<TCandidate>();
    const errorMessageRequired = 'This field is required';
    const printErrorMessageMaxLength = (number: number) => `This field cannot exceed ${number} characters`;

    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2 className="card__form-title">Candidate</h2>
                        <Controller
                            name="first_name"
                            control={control}
                            defaultValue={candidateInfo.first_name}
                            rules={{required: true, maxLength: 20}}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    label="First name"
                                    required
                                    {...field}
                                />
                            }
                        />
                        {errors.first_name?.type === 'required' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        {errors.first_name?.type === 'maxLength' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{printErrorMessageMaxLength(20)}</Typography>
                        }
                        <Controller
                            name="last_name"
                            control={control}
                            defaultValue={candidateInfo.last_name}
                            rules={{required: true, maxLength: 20}}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    label="Last name"
                                    required
                                    {...field}
                                />
                            }
                        />
                        {errors.last_name?.type === 'required' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        {errors.last_name?.type === 'maxLength' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{printErrorMessageMaxLength(20)}</Typography>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2 className="card__form-title">Location</h2>
                        <TextField
                            required
                            select
                            label="Country"
                            InputProps={{
                                readOnly: active,
                            }} defaultValue={candidateInfo.country}
                        >
                            {countriesList.map((option: TSelect) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Controller
                            name="city"
                            control={control}
                            defaultValue={candidateInfo.city}
                            rules={{required: true, maxLength: 20}}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="City"
                                    required
                                />
                            }
                        />
                        {errors.city?.type === 'required' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        {errors.city?.type === 'maxLength' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{printErrorMessageMaxLength(20)}</Typography>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2 className="card__form-title">Contacts</h2>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={candidateInfo.phone}
                            rules={{
                                required: true,
                                maxLength: 13,
                                pattern: PHONE_PATTERN
                            }}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="Phone"
                                    required
                                />
                            }
                        />
                        {errors.phone?.type === 'required' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        {errors.phone?.type === 'pattern' &&
                        <Typography className={classes.typography} variant="subtitle2">Check correct of phone
                            number</Typography>
                        }
                        {errors.phone?.type === 'maxLength' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{printErrorMessageMaxLength(13)}</Typography>
                        }
                        <Controller
                            name="email"
                            control={control}
                            defaultValue={candidateInfo.email}
                            rules={{
                                required: true,
                                pattern: EMAIL_PATTERN
                            }}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="Email"
                                    required
                                />
                            }
                        />
                        {errors.email?.type === 'required' &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        {errors.email?.type === 'pattern' &&
                        <Typography className={classes.typography} variant="subtitle2">Check correct of email
                            address</Typography>
                        }
                        <Controller
                            name="skype"
                            control={control}
                            defaultValue={candidateInfo.skype}
                            rules={{required: true}}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="Skype"
                                    required
                                />
                            }
                        />
                        {errors.skype &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2 className="card__form-title">Skills</h2>
                        <TextField
                            required
                            select
                            label="Main skill"
                            InputProps={{
                                readOnly: active,
                            }}
                            defaultValue={candidateInfo.primary_skills}
                        >
                            {mainSkill.map((option: TSelect) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Controller
                            name="other_technologies"
                            control={control}
                            defaultValue={candidateInfo.other_technologies.join(', ')}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="Other Skills"
                                />
                            }
                        />
                        <TextField
                            required
                            select
                            label="English level"
                            InputProps={{
                                readOnly: active,
                            }}
                            defaultValue={candidateInfo.english_level}
                        >
                            {englishLevel.map((option: TSelect) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Controller
                            name="cv"
                            control={control}
                            defaultValue={candidateInfo.cv}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="CV"
                                />
                            }
                        />
                        {errors.cv &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2 className="card__form-title">Education</h2>
                        <Controller
                            name="education.educational_institution"
                            control={control}
                            defaultValue={candidateInfo.education.educational_institution}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="Institute"
                                />
                            }
                        />
                        {errors.education?.educational_institution &&
                        <Typography className={classes.typography}
                                    variant="subtitle2">{errorMessageRequired}</Typography>
                        }
                        <Controller
                            name="education.faculty"
                            control={control}
                            defaultValue={candidateInfo.education.faculty}
                            render={({field}) =>
                                <TextField
                                    InputProps={{
                                        readOnly: active,
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
                                        readOnly: active,
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
                                        readOnly: active,
                                    }}
                                    {...field}
                                    label="Graduation Date"
                                />
                            }
                        />
                        {errors.graduation_date?.type === 'pattern' &&
                        <Typography className={classes.typography} variant="subtitle2">Check correct of date
                            format</Typography>
                        }
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h2 className="card__form-title">Other information</h2>
                        <TextField
                            required
                            select
                            label="Preferred time for interview"
                            InputProps={{
                                readOnly: active,
                            }}
                            defaultValue={candidateInfo.time}
                        >
                            {preferredTime.map((option: TSelect) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Paper>
                </Grid>
            </Grid>
            <div style={{display: 'flex', justifyContent: 'center', margin: '30px 0'}}>
                <Button
                    type="submit"
                    variant="contained"
                    color={active ? "primary" : "secondary"}
                    onClick={() => setActive(!active)}
                >
                    {active ? 'Edit' : 'Save'}
                    {active ?
                        <EditIcon fontSize="small" style={{color: 'white'}}/> :
                        <SaveIcon fontSize="small" style={{color: 'white'}}/>
                    }
                </Button>
            </div>
            {/**
             *here should be button 'save' with PUT request
             * */
            }
        </form>
    );
};

export default CandidateInfo;
