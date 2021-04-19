import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    TextField,
    DialogContentText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

type TSoftSkillsProps = {
    field?: JSX.Element,
    skill: string
}

const CandidateSkills: React.FC<TSoftSkillsProps> = ({ field, skill }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        /**
         * 1) here will be PUT (POST?) request to send review in the BD
         * **/
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                <AddIcon/>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Candidate {skill} skills review</DialogTitle>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
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
        </>
    );
};

export default CandidateSkills;
