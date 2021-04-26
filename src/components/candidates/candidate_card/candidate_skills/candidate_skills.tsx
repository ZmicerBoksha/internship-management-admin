import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { DialogActions, DialogContent, DialogTitle, Dialog, TextField, DialogContentText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type TSoftSkillsProps = {
  skill: string;
  skillsDescription: string;
  handleSkillsDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitReview?: any;
};

const CandidateSkills: React.FC<TSoftSkillsProps> = ({
  skill,
  skillsDescription,
  handleSkillsDescription,
  handleSubmitReview,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <AddIcon />
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Candidate {skill} skills review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave detailed review on the candidate's {skill} skills. Please note that by sending a review, it cannot be
            changed.
          </DialogContentText>
          <TextField
            required
            label="Description of candidate"
            type="text"
            fullWidth
            value={skillsDescription}
            onChange={handleSkillsDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmitReview();
              handleClose();
            }}
            color="primary"
          >
            Send review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CandidateSkills;
