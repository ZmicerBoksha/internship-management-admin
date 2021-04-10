import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContentText } from '@material-ui/core';

type TSoftSkillsProps = {
    field?: any,
    skill: string
}

const CandidateSkills: React.FC<TSoftSkillsProps> = ({ field, skill }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        /**
         * 1) here will be PUT (POST?) request to send review in the BD
         * 2) the same should be in hardSkills
         * 3) Context maybe need to remove
         * **/
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add review
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Review about candidate {skill}Skills</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Leave detailed review on the candidate's {skill} skills.
                        Please note that by sending a review, it cannot be changed.
                    </DialogContentText>
                    {field}
                    <TextField
                        required
                        margin="dense"
                        label="Description of candidate"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={handleDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Send review
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CandidateSkills;
