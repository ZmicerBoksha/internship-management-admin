import { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { TModalError, useModalErrorContext } from './modalErrorContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const ModalErrorContent: FunctionComponent<TModalError> = ({ isOpen, errorTitle, errorText }) => {
  const classes = useStyles();
  const { modalError, setModalError } = useModalErrorContext();

  useEffect(() => {
    setModalError({
      isOpen,
      errorTitle,
      errorText,
    });
  }, []);

  const handleClose = () => {
    setModalError({
      isOpen: false,
    });
  };

  return (
    <div>
      <Modal className={classes.modal} open={Boolean(modalError?.isOpen)} onClose={handleClose}>
        <Fade in={modalError?.isOpen}>
          <div className={classes.paper}>
            <h2>{modalError?.errorTitle}</h2>
            <p>{modalError?.errorText}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalErrorContent;
