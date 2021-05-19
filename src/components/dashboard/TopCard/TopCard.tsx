import React from 'react';
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
    padding: '3%',
  },
}));
interface ICard {
  icon: any;
  title: string;
  quantity: string;
}

export default function TopCard(props: ICard) {
  const classes = useStyles();

  const { icon, title, quantity } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={2}>
        <Grid container justify="center" direction="row" alignItems="center" spacing={5}>
          <Grid item xs={3}>
            {icon}
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column" justify="center" alignItems="flex-end">
              <Grid item xs={12}>
                <Typography color="textSecondary" gutterBottom>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" gutterBottom>
                  {quantity}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
