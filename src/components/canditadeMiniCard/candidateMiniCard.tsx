import React from 'react';
import './candidateMiniCard.scss';
import {Card, CardContent, Divider, Grid, Paper, Typography} from "@material-ui/core";

const CandidateMiniCard: React.FC = () => {
    return (
        <Card className="miniCard">
                <Grid container>
                    <Typography variant="h6" className="columnName" noWrap>
                        Name:
                    </Typography>
                    <Typography variant="h6" noWrap>
                        Ivan Ivanovich
                    </Typography>
                </Grid>
                <Divider variant="middle"/>
                <Grid container>
                    <Typography variant="h6" className="columnName" noWrap>
                        Event:
                    </Typography>
                    <Typography variant="h6" noWrap>
                        JAVA and JS internship
                    </Typography>
                </Grid>
                <Divider variant="middle"/>
                <Grid xs={12} container>
                    <div className="wrapper">
                        <Typography variant="h6" className="columnName" noWrap>
                            Сall date:
                        </Typography>
                        <Typography variant="h6" noWrap>
                            13:00 27/04/2021
                        </Typography>
                    </div>
                    <div className="wrapper">
                        <Typography variant="h6" className="columnName" noWrap>
                            Technology:
                        </Typography>
                        <Typography variant="h6" noWrap>
                            JS
                        </Typography>
                    </div>
                </Grid>
        </Card>
    )
        ;
};

export default CandidateMiniCard;