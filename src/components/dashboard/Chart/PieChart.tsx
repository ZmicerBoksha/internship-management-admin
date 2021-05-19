import React from 'react';
import Chart from 'react-google-charts';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    width: '100%',
  },
}));

export default function PieChart() {
  const classes = useStyles();
  const [{ data: CandidateData, loading, error }] = useAxios<any>({
    url: `/candidate?itemsPerPage=1000&page=0`,
    method: 'GET',
  });
  if (loading) return <p>Loading...</p>;

  const Candidates = CandidateData.content.map((eventInfo: any) => eventInfo);
  const Java = Candidates.filter((eventInfo: any) => eventInfo.mainSkill === 'Java').length;
  const JavaScript = Candidates.filter((eventInfo: any) => eventInfo.mainSkill === 'JavaScript').length;
  const Devops = Candidates.filter((eventInfo: any) => eventInfo.mainSkill === 'DevOps').length;
  return (
    <Paper className={classes.paper} elevation={2}>
      <Chart
        width={'100%'}
        height={'100%'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Task', 'Hours per Day'],
          ['JavaScript', JavaScript],
          ['Java', Java],
          ['Devops', Devops],
        ]}
        options={{
          title: 'Applied Candidates by technology',
          pieHole: 0.3,
        }}
        rootProps={{ 'data-testid': '3' }}
      />
    </Paper>
  );
}
