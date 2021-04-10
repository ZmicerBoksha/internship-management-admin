import React, { useState } from 'react';
import { TCandidate } from '../../candidate_list/candidates_list';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch'
            },
            '& > svg': {
                margin: theme.spacing(3),
            },
        },
    }),
);

export type TSelect = {
    value: string,
    label: string
}

type TCandidateInfoProps = {
    candidateInfo: TCandidate,
    englishLevel: Array<TSelect>,
    countriesList: Array<TSelect>,
    mainSkill: Array<TSelect>,
    preferredTime: Array<TSelect>
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

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className="card__form">
                <h2 className="card__form-title">Candidate</h2>
                <TextField
                    required
                    label="First name"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.first_name}
                />
                <TextField
                    required
                    label="Last name"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.last_name}
                />
            </div>
            <div className="card__form">
                <h2 className="card__form-title">Contacts</h2>
                <TextField
                    required
                    label="Phone"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.phone}
                />
                <TextField
                    required
                    label="Email"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.email}
                />
                <TextField
                    required
                    label="Skype"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.skype}
                />
            </div>
            <div className="card__form">
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
                <TextField
                    required
                    label="City"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.city}
                />
            </div>
            <div className="card__form">
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
                <TextField
                    label="Other Skills"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.other_technologies.join(', ')}
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
            </div>
            <div className="card__form">
                <h2 className="card__form-title">Education</h2>
                <TextField
                    label="Institute"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.education.educational_institution}
                />
                <TextField
                    label="Faculty"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.education.faculty}
                />
                <TextField
                    label="Speciality"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.education.speciality}
                />
                <TextField
                    label="Graduation Date"
                    type="year"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.graduation_date}
                />
            </div>
            <div className="card__form">
                <h2 className="card__form-title">Other information</h2>
                <TextField
                    label="CV"
                    InputProps={{
                        readOnly: active,
                    }}
                    defaultValue={candidateInfo.cv}
                />
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
            </div>
            <Button
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
            {/**
             *here should be button 'save' with PUT request
             * */}
        </form>
    );
};

export default CandidateInfo;
