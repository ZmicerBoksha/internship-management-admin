import React from 'react';
import CandidateSkills from '../candidate_skills/candidate_skills';
import TextField from '@material-ui/core/TextField';
import { TSelect } from '../candidate_info/candidate_info';
import MenuItem from '@material-ui/core/MenuItem';

type TCandidateReview = {
    englishLevels: Array<TSelect>
}

const CandidateReview: React.FC<TCandidateReview> = ({ englishLevels}) => {

    return (
        <div>
            <div className="card__review">
                <h2 className="card__review-title">Review about soft skills</h2>
                <CandidateSkills
                    field={
                        <TextField
                            required
                            select
                            margin="dense"
                            label="English level"
                            type="text"
                            defaultValue=""
                            fullWidth
                        >
                            {englishLevels.map((option: TSelect) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    }
                    skill={'soft'}
                />
                {/**
                 * here should be GET request to get reviews from BD
                 **/}
            </div>
            <div className="card__review">
                <h2 className="card__review-title">Review about technical skills</h2>
                <CandidateSkills skill={'hard'} />
            </div>
        </div>
    );
};

export default CandidateReview;
