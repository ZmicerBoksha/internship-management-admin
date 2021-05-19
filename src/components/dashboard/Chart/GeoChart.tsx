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
interface ICandidate {
  country: string;
}
export default function GeoChart() {
  const classes = useStyles();
  const [{ data: CandidateData, loading, error }] = useAxios<any>({
    url: `/candidate?itemsPerPage=1000&page=0`,
    method: 'GET',
  });
  if (loading) return <p>Loading...</p>;

  const Candidates = CandidateData.content.map((eventInfo: any) => eventInfo);
  const CandidateCountries = [...new Set<string>(Candidates.map((eventInfo: ICandidate) => eventInfo.country))];

  const countryRateList = CandidateCountries.map((uniqueCtr: any) => [
    uniqueCtr,
    Candidates.filter((cnt: any) => cnt.country === uniqueCtr).length,
  ]);

  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography variant="h6" align="center" component="h5" gutterBottom>
        Applied Candidates by Countries
      </Typography>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="GeoChart"
        data={[['Country', 'Candidates'], ...countryRateList]}
        // https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        // mapsApiKey="YOUR_KEY_HERE"
        options={{
          title: 'Applied Candidates by technology',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </Paper>
  );
}
