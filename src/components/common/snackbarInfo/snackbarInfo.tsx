import { FunctionComponent, SyntheticEvent, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TSnackbar, useSnackbarContext } from './snackbarContext';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackbarInfo: FunctionComponent<TSnackbar> = ({ isOpen, alertSeverity, alertMessage }) => {
  const classes = useStyles();
  const { snackbar, setSnackbar } = useSnackbarContext();

  useEffect(() => {
    setSnackbar({
      isOpen,
      alertSeverity,
      alertMessage,
    });
  }, []);

  const snackbarClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({
      isOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={Boolean(snackbar?.isOpen)} autoHideDuration={6000} onClose={snackbarClose}>
        <Alert onClose={snackbarClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarInfo;
