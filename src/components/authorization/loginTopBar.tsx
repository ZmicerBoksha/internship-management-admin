import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Logo from './logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      color: '#0082ca',
      marginTop: theme.spacing(2),
      textTransform: 'uppercase',
    },
  }),
);
interface Subname {
  subname: string;
}
export default function LoginTopBar(props: Subname) {
  const classes = useStyles();
  const { subname } = props;
  return (
    <div className={classes.paper}>
      <img style={{ objectFit: 'contain', width: '100%' }} src={Logo} alt="" />
      <Typography component="h1" variant="h4" className={classes.title}>
        {subname}
      </Typography>
    </div>
  );
}
