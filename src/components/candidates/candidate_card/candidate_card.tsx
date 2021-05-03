import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './styles.css';
import CandidateInfo from './candidate_info/candidate_info';
import CandidateReview from './candidate_review/candidate_review';
import useAxios from 'axios-hooks';
import CandidateProgress from './candidate_progress/candidate_progress';
import { makeStyles, Typography } from '@material-ui/core';
import CandidateInterview from './candidate_interview/candidate_interview';
import { statusHistoryServer } from '../../../api/api';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  typography: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '40px',
    margin: '20px 0',
  },
});

export const Context = React.createContext({});

const CandidateCard: React.FC = () => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [statusColor, setStatusColor] = useState<string>('#fafbfd');

  const setCandidatesStatusColor = (color: string) => {
    let red = 'NOT_SUITABLE';
    let green = 'SUITABLE';
    let yellow = 'IN_PROGRESS';
    let blue = null;

    switch (color) {
      case red:
        setStatusColor('#FDDCE0FF');
        break;
      case green:
        setStatusColor('#BEE7CBFF');
        break;
      case yellow:
        setStatusColor('#FDFBCBFF');
        break;
      case blue:
        setStatusColor('#fafbfd');
        break;
    }
  };

  const [{ data: getCandidateInfo /*loading: getLoading, error: getError*/ }] = useAxios(url);

  const [{ data: updateCandidateInfo /*loading: putLoading, error: putError */ }, executePut] = useAxios(
    {
      url: url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true },
  );

  const editCandidateData = (field: any) => {
    executePut({
      data: {
        ...field,
      },
    });
  };

  const handleNextStep = (statusId: number) => {
    const body = {
      candidateId: getCandidateInfo.id,
      changeNote: 'string',
      employeeId: 1,
      statusId: statusId,
    };

    statusHistoryServer
      .createStatusHistory(body)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    setActiveStep((prevState: number) => prevState + 1);
  };

  return getCandidateInfo && (
    <Context.Provider value={{ activeStep, setActiveStep, handleNextStep }}>
      <div className="card">
        <div className="card__container" style={{ backgroundColor: statusColor }}>
          <Typography variant="h2" className={classes.typography}>
            {`${getCandidateInfo.firstName} ${getCandidateInfo.lastName}`}
          </Typography>
          <CandidateProgress
            candidateInfo={getCandidateInfo}
            editCandidateData={editCandidateData}
            updateCandidateInfo={updateCandidateInfo}
            setCandidatesStatusColor={setCandidatesStatusColor}
          />
          <CandidateInfo
            updateCandidateInfo={updateCandidateInfo}
            candidateInfo={getCandidateInfo}
            editCandidateData={editCandidateData}
          />
          <CandidateInterview candidateInfo={getCandidateInfo} />
          <CandidateReview getCandidateInfo={getCandidateInfo} />
        </div>
      </div>
    </Context.Provider>
  );
};

export default CandidateCard;
