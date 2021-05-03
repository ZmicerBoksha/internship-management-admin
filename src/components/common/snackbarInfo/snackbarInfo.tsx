import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

type TSnackbarInfo = {
  isOpen?: boolean;
  alertSeverity?: 'success' | 'error' | 'warning' | 'info';
  alertMessage?: string;
};

const SnackbarInfo: FunctionComponent<TSnackbarInfo> = ({ isOpen, alertSeverity, alertMessage }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);

  const snackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={snackbarClose}>
        <Alert onClose={snackbarClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarInfo;
