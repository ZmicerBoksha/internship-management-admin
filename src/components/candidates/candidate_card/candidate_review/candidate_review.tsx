import React, { useEffect, useState } from 'react';
import CandidateSkills from '../candidate_skills/candidate_skills';
import { Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useAxios from 'axios-hooks';
import { TCandidate, TFeedback } from '../../../../types/types';

type TCandidateReviewProps = {
  getCandidateInfo: TCandidate;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    paper: {
      minWidth: '500px',
      minHeight: '200px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

const CandidateReview: React.FC<TCandidateReviewProps> = ({ getCandidateInfo }) => {
  const classes = useStyles();
  const [softSkillsDescription, setSoftSkillsDescription] = useState<string>('');
  const [hardSkillsDescription, setHardSkillsDescription] = useState<string>('');

  const handleSoftSkillsReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoftSkillsDescription(e.target.value);
  };

  const handleHardSkillsReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHardSkillsDescription(e.target.value);
  };

  const [{ data: postReview /*loading: postLoading, error: postError*/ }, executePost] = useAxios(
    {
      url: '/interview-feedback',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true },
  );

  const addReview = (data: TFeedback) => {
    executePost({ data });
  };

  const [{ data: getInterviewFeedback /*loading: getLoading, error: getError*/ }, getFetch] = useAxios(
    `/interview-feedback?search=candidate.id==${getCandidateInfo.id}`,
  );

  useEffect(() => {
    getFetch();
  }, [postReview, getFetch]);

  const handleSubmitReview = () => {
    setSoftSkillsDescription('');
    setHardSkillsDescription('');
    addReview({
      feedback: softSkillsDescription || hardSkillsDescription,
      idCandidate: getCandidateInfo.id,
      idEmployee: 2 /*will change later, when authorization will be ready*/,
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h2 className="card__review-title">Soft skills review</h2>
        {getInterviewFeedback && getInterviewFeedback.content.length ? (
          <Typography variant="subtitle1" style={{ fontSize: '18px' }}>
            {getInterviewFeedback.content[0].feedback}
          </Typography>
        ) : (
          <CandidateSkills
            skill="soft"
            skillsDescription={softSkillsDescription}
            handleSkillsDescription={handleSoftSkillsReview}
            handleSubmitReview={handleSubmitReview}
            statusId={2}
          />
        )}
      </Paper>
      <Paper className={classes.paper}>
        <h2 className="card__review-title">Technical skills review</h2>
        {getInterviewFeedback && getInterviewFeedback.content.length >= 2 ? (
          <Typography variant="subtitle1" style={{ fontSize: '18px' }}>
            {getInterviewFeedback.content[1].feedback}
          </Typography>
        ) : (
          <CandidateSkills
            skill="hard"
            skillsDescription={hardSkillsDescription}
            handleSkillsDescription={handleHardSkillsReview}
            handleSubmitReview={handleSubmitReview}
            statusId={4}
          />
        )}
      </Paper>
    </div>
  );
};

export default CandidateReview;
