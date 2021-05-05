import { Grid, Typography } from "@material-ui/core";
import CandidateMiniCard from "../canditadeMiniCard/candidateMiniCard";
import React, { useEffect, useState } from "react";
import { getCandidateById, getCandidateIdByEmpolee, getStatusCandidateById } from "../../../api/api";
import { TCandidate, TInterviewTime, TStatusHistory } from "../../../types/types";

type CandidateTrelloProps = {
  timeZon: string;
  staffId: number;
};

const CandidateTrello: React.FC<CandidateTrelloProps> = ({ timeZon, staffId }) => {

  const [intreviewTimeData, setintreviewTimeData] = useState<TInterviewTime[]>([]);
  const [candidatetsData, setCandidatetsData] = useState<TCandidate[]>([]);
  const [statusHistoryData, setStatusHistoryData] = useState<TStatusHistory[]>([]);

  useEffect(() => {
    async function getData() {
      await getCandidateIdByEmpolee(staffId).then(response => {
        setintreviewTimeData(response);
        return response.map(item => item.cnId).sort();
      }).then(condidateIds => {
        getCandidateById(condidateIds).then(response => {
          setCandidatetsData(response);
          return response.map(item => item.id);
        }).then(condidateIds => {
          getStatusCandidateById(condidateIds).then(response => {
            setStatusHistoryData(response);
          });
        });
      });
    }

    getData();
  }, []);

  let mass: any[] = [];

  intreviewTimeData?.forEach((item) => {
    mass.push({
      ["id"]: item.cnId, ["interviewDate"]: item.beginDate
    });
  });

  candidatetsData.forEach((item, index) => {
    mass[index]["firstName"] = candidatetsData[index].firstName;
    mass[index]["lastName"] = candidatetsData[index].lastName;
    mass[index]["primaryTechnology"] = candidatetsData[index].mainSkill;
  });


  statusHistoryData.forEach((item, index) => {
    mass[index]["status"] = statusHistoryData[index].status.name;
  });
 let notRevived = mass.filter(item =>
    item.status === "Status name 1");
  let revived = mass.filter(item =>
    item.status === "Status name 2"
  );

  return (
    <Grid container xs={12} justify="center">
      <Grid item xs={6}>
        <Typography variant="h5" className="subtitle subtitle--notRevived" noWrap>
          Not reviewed candidates
        </Typography>
        <div>
          {notRevived.map((candidate, i) => (<CandidateMiniCard key={i} timeZon={timeZon} candidate={candidate} />))}
        </div>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" className="subtitle subtitle--revived" noWrap>
          Reviewed candidates
        </Typography>
        {revived.map((candidate, i) => (<CandidateMiniCard key={i} timeZon={timeZon} candidate={candidate} />))}
      </Grid>
    </Grid>
  );
};

export default CandidateTrello;
