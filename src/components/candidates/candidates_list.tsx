import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
);

type TEducation = {
    educational_institution: string,
    faculty: string,
    speciality: string
};

export type TCandidate = {
    id: number,
    first_name: string,
    last_name: string,
    patronymic: string,
    phone: string,
    email: string,
    skype: string,
    english_level: string,
    country: string,
    city: string,
    primary_skills: string,
    other_technologies: Array<string>,
    education: TEducation,
    graduation_date: string,
    cv: string,
    date: Date,
    time: string
};

const CandidatesList: React.FC = () => {
    const [candidatesList, setCandidatesList] = useState<Array<TCandidate>>([]);
    /**assign type!!!**/

    let fetchCandidates = () => {
        fetch('http://localhost:3000/candidates')
            .then((response) => {
                return response.json();
            })
            .then((data: Array<TCandidate>) => {
                setCandidatesList(data);
            });
    }

    useEffect(() => {
        fetchCandidates();
    }, []);

    const classes = useStyles();

    return (
        <div className="candidates">
            <table className="candidates__table">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Candidate</th>
                    <th>Contacts</th>
                    <th>Location</th>
                    <th>Technical skills</th>
                    <th>Education</th>
                    <th>English level</th>
                    <th>CV</th>
                    <th>Preferred time for interview</th>
                </tr>
                </thead>
                <tbody>
                {
                    candidatesList.map((candidate: TCandidate, index: number) => {
                        let {
                            id,
                            first_name,
                            last_name,
                            patronymic,
                            phone,
                            email,
                            skype,
                            english_level,
                            country,
                            city,
                            primary_skills,
                            other_technologies,
                            cv,
                            time,
                            education
                        } = candidate;
                        let {educational_institution, faculty, speciality} = education;
                        return (
                            <tr key={id}>
                                <td style={{minWidth: '200px', textAlign: 'center'}}>
                                    {index + 1}
                                    <Link
                                        to={`/candidates/${id}`}
                                        style={{display: 'block', textDecoration: 'none'}}
                                    >
                                        <div className={classes.root}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                            >
                                                Show candidate
                                            </Button>
                                        </div>
                                    </Link>
                                </td>
                                <td className="candidates__column">
                                    <div>
                                        <span><strong>Name:</strong> {first_name} </span>
                                        <span><strong>Surname:</strong> {last_name} </span>
                                        <span><strong>Patronymic:</strong> {patronymic}</span>
                                    </div>
                                </td>
                                <td className="candidates__column">
                                    <div>
                                        <span><strong>Phone:</strong> {phone} </span>
                                        <span><strong>Email:</strong> {email} </span>
                                        <span><strong>Skype:</strong> {skype}</span>
                                    </div>
                                </td>
                                <td className="candidates__column">
                                    <div>
                                        <span><strong>Country:</strong> {country} </span>
                                        <span><strong>City:</strong> {city} </span>
                                    </div>
                                </td>
                                <td className="candidates__column">
                                    <div>
                                        <span><strong>Main Skills:</strong> {primary_skills} </span>
                                        <span><strong>Other technologies:</strong> {other_technologies} </span>
                                    </div>
                                </td>
                                <td className="candidates__column">
                                    <div>
                                        <span><strong>Institute:</strong> {educational_institution} </span>
                                        <span><strong>Faculty:</strong> {faculty} </span>
                                        <span><strong>Speciality:</strong> {speciality}</span>
                                    </div>
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    <span>{english_level}</span>
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    <span>{cv}</span>
                                </td>
                                <td style={{textAlign: 'center'}}>
                                    <span>{time}</span>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default CandidatesList;
