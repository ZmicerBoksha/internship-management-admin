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
import CandidateSchedule from './candidate_schedule/candidate_schedule';

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

interface IContext {
  activeStep: number;
  handleNextStep: (statusId: number) => void;
}

export const Context = React.createContext<Partial<IContext>>({});

const CandidateCard: React.FC = () => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [statusColor, setStatusColor] = useState<string>('#fafbfd');
  const [time, setTime] = useState([]);
  const [slots, setSlots] = useState([{
    id: 25,
    dateTime: new Date(2021, 6, 25, 18, 30, 0),
  }]);

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
        setStatusColor('#d6fae2');
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

  /*
  const [{ data: example /!*loading: getLoading, error: getError*!/ }] = useAxios('/status/history/1');
*/

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

  return getCandidateInfo ? (
    <Context.Provider value={{ activeStep, handleNextStep }}>
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
          <CandidateReview getCandidateInfo={getCandidateInfo} />
          <CandidateInterview setSlots={setSlots} candidateInfo={getCandidateInfo} />
          <CandidateSchedule slots={slots} />
        </div>
      </div>
    </Context.Provider>
  ) : null;
};

export default CandidateCard;
