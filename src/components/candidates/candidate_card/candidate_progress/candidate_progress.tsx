import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { statusHistoryServer, statusServer } from '../../../../api/api';
import { Context } from '../candidate_card';
import { TCandidate, TStatus } from '../../../../types/types';
import { IN_PROGRESS, NOT_SUITABLE, SUITABLE } from '../../../common/const/const';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    reject: {
      marginRight: theme.spacing(2),
      backgroundColor: 'red',
      color: 'white',
      '&:hover': {
        backgroundColor: '#c21818',
      },
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: 400,
    },
    stepper: {
      boxShadow: '1px 1px 1px #dedfe0',
      margin: '40px 0 20px',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px 0 70px',
    },
    info: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '20px 0',
    },
    pending: {
      backgroundColor: '#fdbf02',
      color: 'white',
      marginRight: theme.spacing(2),
      '&:hover': {
        backgroundColor: '#bd951a',
      },
    },
    approve: {
      backgroundColor: '#1EB31FFF',
      color: 'white',
      '&:hover': {
        backgroundColor: '#217b21',
      },
    },
  }),
);

type CandidateProgressProps = {
  candidateInfo: TCandidate;
  editCandidateData: (data: { status: string }) => void;
  updateCandidateInfo: TCandidate;
  setCandidatesStatusColor: (color: string) => void;
};

const CandidateProgress: React.FC<CandidateProgressProps> = ({
  candidateInfo,
  editCandidateData,
  updateCandidateInfo,
  setCandidatesStatusColor,
}) => {
  const [status, setStatus] = useState<TStatus[]>([]);
  const classes = useStyles();
  const steps = getSteps();
  const { activeStep } = useContext(Context);
  const [currentStep, setCurrentStep] = useState<number>(1);

  function getSteps() {
    return status.map((item: TStatus) => item.name);
  }

  function getStepContent(stepIndex: number) {
    return status.map((item: TStatus, index: number) => {
      return stepIndex === index ? item.description : '';
    });
  }

  const setCandidateStatus = (statusName: string) => {
    editCandidateData({ status: statusName });
    setCandidatesStatusColor(statusName);
  };

  useEffect(() => {
    statusServer
      .getAllStatus()
      .then(({ data: { content } }) => {
        setStatus(content);
      })
      .catch(err => {
        console.log(err);
      });

    setCandidatesStatusColor(candidateInfo.status);
  }, []);

  useEffect(() => {
    statusHistoryServer
      .getStatusHistoryByCandidate(candidateInfo.id)
      .then(({ data: { content } }) => {
        setCurrentStep(content[content.length - 1].status.id);
      })
      .catch(e => {
        console.log(e);
      });
  }, [candidateInfo.id, activeStep]);

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={currentStep} alternativeLabel>
        {steps.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <h2 className={classes.instructions}>{getStepContent(currentStep)}</h2>
        {currentStep === steps.length ? (
          <div className={classes.info} style={updateCandidateInfo && { display: 'none' }}>
            {(!candidateInfo.status || candidateInfo.status === IN_PROGRESS) && (
              <>
                <Typography>All steps completed. Please accept or reject this candidate.</Typography>
                <div className={classes.buttonWrapper}>
                  <Button className={classes.reject} onClick={() => setCandidateStatus(NOT_SUITABLE)}>
                    Reject
                  </Button>
                  <Button className={classes.pending} onClick={() => setCandidateStatus(IN_PROGRESS)}>
                    Pending
                  </Button>
                  <Button className={classes.approve} onClick={() => setCandidateStatus(SUITABLE)}>
                    Approve
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className={classes.buttonWrapper}>
              {!candidateInfo.status && (
                <Button
                  className={classes.reject}
                  onClick={() => setCandidateStatus(NOT_SUITABLE)}
                  style={updateCandidateInfo && { display: 'none' }}
                >
                  Reject
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProgress;
