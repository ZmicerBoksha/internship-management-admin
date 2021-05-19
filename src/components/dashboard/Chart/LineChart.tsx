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

export default function LineChart() {
  const classes = useStyles();
  const [{ data: CandedateData, loading, error }] = useAxios<any>({
    url: `/candidate`,
    method: 'GET',
  });
  const [{ data: EventData, loading: EventLoading, error: EventError }, refetch] = useAxios<any>({
    url: `/event/all`,
    method: 'GET',
  });
  if (EventLoading) return <p>Loading...</p>;
  const Events = EventData.content
    // .filter((eventInfo: any) => eventInfo.eventTab === 'IN_PROGRESS')
    .map((eventInfo: any) => eventInfo.eventType?.name);

  console.table(Events);
  return (
    <Paper className={classes.paper} elevation={2}>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['x', Events[0], Events[1], Events[2], Events[3]],
          [new Date(2021, 0), 0, 0, 1, 2],
          [new Date(2021, 1), 10, 5, 3, 5],
          [new Date(2021, 2), 23, 15, 12, 44],
          [new Date(2021, 3), 17, 9, 12, 22],
          [new Date(2021, 4), 18, 10, 3, 1],
          [new Date(2021, 5), 9, 5, 3, 6],
          [new Date(2021, 6), 11, 3, 34, 56],
          [new Date(2021, 7), 27, 19, 12, 23],
        ]}
        options={{
          hAxis: {
            title: 'Time',
          },
          vAxis: {
            title: 'Popularity',
          },
          series: {
            1: { curveType: 'function' },
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    </Paper>
  );
}
