import React from 'react';
import CandidateSkills from '../candidate_skills/candidate_skills';
import { TSelect } from '../candidate_info/candidate_info';
import { Paper, TextField, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useAxios from 'axios-hooks';
import { TCandidate } from '../../candidate_list/candidates_list';

type TCandidateReviewProps = {
  getCandidateInfo: TCandidate;
  englishLevels: TSelect[];
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
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

const CandidateReview: React.FC<TCandidateReviewProps> = ({ englishLevels, getCandidateInfo }) => {
  const classes = useStyles();

  const [{ data: postReview, loading: postLoading, error: postError }, executePost] = useAxios(
    {
      url: '/interview-feedback',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true },
  );

  const addReviewFromHR = (data: any) => {
    executePost({
      data: {
        ...data,
      },
    });
  };

  console.log(postReview);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h2 className="card__review-title">Soft skills review</h2>
        <CandidateSkills
          field={
            <TextField required select margin="dense" label="English level" type="text" defaultValue="" fullWidth>
              {englishLevels.map((option: TSelect) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          }
          addReview={addReviewFromHR}
          getCandidateInfo={getCandidateInfo}
          skill="soft"
        />
        {/**
         * here should be GET request to get reviews from BD
         **/}
      </Paper>
      <Paper className={classes.paper}>
        <h2 className="card__review-title">Technical skills review</h2>
        <CandidateSkills skill="hard" />
      </Paper>
    </div>
  );
};

export default CandidateReview;
