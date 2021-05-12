import React from "react";
import "./candidateMiniCard.scss";
import { Card, CardContent, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

type CandidateMiniCardProps = {
  timeZon: string;
  candidate: any;
};


const CandidateMiniCard: React.FC<CandidateMiniCardProps> = ({ timeZon, candidate }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/candidate/${candidate.id}`);
  };

  return (
    <Card onClick={handleClick} className="miniCard">
      <Grid container>
        <Typography variant="h6" className="columnName" noWrap>
          Name:
        </Typography>
        <Typography variant="h6" noWrap>
          {candidate.firstName}
        </Typography>
      </Grid>
      <Grid container>
        <Typography variant="h6" className="columnName" noWrap>
          Last Name:
        </Typography>
        <Typography variant="h6" noWrap>
          {candidate.lastName}
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <Grid container>
        <Typography variant="h6" className="columnName" noWrap>
          Event:
        </Typography>
        <Typography variant="h6" noWrap>
          JAVA and JS internship
        </Typography>
      </Grid>
      <Divider variant="middle" />
      <Grid xs={12} container>
        <div className="wrapperCard">
          <Typography variant="h6" className="columnName" noWrap>
            Сall date:
          </Typography>
          <Typography variant="h6" noWrap>
            {new Intl.DateTimeFormat("en-GB", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZone: timeZon
            }).format(new Date(candidate.interviewDate))}
          </Typography>
        </div>
        <div className="wrapperCard">
          <Typography variant="h6" className="columnName" noWrap>
            Technology:
          </Typography>
          <Typography variant="h6" noWrap>
            {candidate.primaryTechnology}
          </Typography>
        </div>
      </Grid>
    </Card>
  );
};

export default CandidateMiniCard;
