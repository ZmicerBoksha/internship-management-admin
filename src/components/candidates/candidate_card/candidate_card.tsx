import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { TCandidate } from '../candidate_list/candidates_list';
import './styles.css';
import CandidateInfo from './candidate_info/candidate_info';
import CandidateReview from './candidate_review/candidate_review';

const ENGLISH_LEVELS = [
    {
        value: 'A1',
        label: 'Beginner(A1)',
    },
    {
        value: 'A2',
        label: 'Elementary(A2)',
    },
    {
        value: 'B1',
        label: 'Pre-Intermediate(B1)',
    },
    {
        value: 'B1+',
        label: 'Intermediate(B1+)',
    },
    {
        value: 'B2',
        label: 'Upper Intermediate(B2)',
    },
    {
        value: 'C1',
        label: 'Advanced(C1)',
    },
];

const COUNTRIES_LIST = [
    {
        value: 'Belarus',
        label: 'Belarus',
    },
    {
        value: 'Poland',
        label: 'Poland',
    },
    {
        value: 'Russia',
        label: 'Russia',
    },
    {
        value: 'Georgia',
        label: 'Georgia',
    },
    {
        value: 'Ukraine',
        label: 'Ukraine',
    },
    {
        value: 'Lithuania',
        label: 'Lithuania',
    },
    {
        value: 'Uzbekistan',
        label: 'Uzbekistan',
    },
    {
        value: 'United States',
        label: 'United States',
    },
];

const MAIN_SKILL = [
    {
        value: 'JavaScript',
        label: 'JavaScript',
    },
    {
        value: 'Java',
        label: 'Java',
    },
    {
        value: 'DevOps',
        label: 'DevOps',
    },
    {
        value: 'QA Testing',
        label: 'QA Testing',
    },
    {
        value: 'Python',
        label: 'Python',
    }
];

const PREFERRED_TIME = [
    {
        value: 'From 10.00 to 13.00',
        label: 'From 10.00 to 13.00',
    },
    {
        value: 'From 13.00 to 16.00',
        label: 'From 13.00 to 16.00',
    },
    {
        value: 'From 16.00 to 19.00',
        label: 'From 16.00 to 19.00',
    },
    {
        value: 'Any time',
        label: 'Any time',
    }
];

const CandidateCard: React.FC = () => {
    let {url} = useRouteMatch();
    let [candidateInfo, setCandidateInfo] = useState<TCandidate>();

    useEffect(() => {
        fetch(`http://localhost:3000${url}`)
            .then((response) => {
                return response.json();
            })
            .then((data: TCandidate) => {
                setCandidateInfo(data);
            });
    }, [url]);

    return candidateInfo ? (
        <div className="wrapper">
            <div className="card">
                <div className="card__container">
                    <h1 className="card__title">
                        {`${candidateInfo.first_name}
                          ${candidateInfo.last_name}`}
                    </h1>
                    <span>{candidateInfo.date}</span>
                    <CandidateInfo
                        candidateInfo={candidateInfo}
                        englishLevel={ENGLISH_LEVELS}
                        countriesList={COUNTRIES_LIST}
                        mainSkill={MAIN_SKILL}
                        preferredTime={PREFERRED_TIME}
                    />
                    <CandidateReview englishLevels={ENGLISH_LEVELS}/>
                </div>
            </div>
        </div>
    ) : null;
};

export default CandidateCard;
