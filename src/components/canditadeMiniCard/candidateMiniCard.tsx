import React from 'react';
import './candidateMiniCard.scss';
import {Card, CardContent, Divider, Grid, Paper, Typography} from "@material-ui/core";
type CandidateMiniCardProps={
    timeZon:string,
    op?:string
}
const  CandidateMiniCard: React.FC<CandidateMiniCardProps>= ({timeZon,op}) => {
    const date = new Date("2012-05-24");

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
                            {new Intl.DateTimeFormat('en-GB', {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                timeZone: timeZon
                            }).format(date)}
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