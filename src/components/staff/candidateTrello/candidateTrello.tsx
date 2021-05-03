import { Grid, Typography } from "@material-ui/core";
import CandidateMiniCard from "../canditadeMiniCard/candidateMiniCard";
import React, { useEffect, useState } from "react";
import { getCandidateById, getCandidateIdByEmpolee, getStatusCandidateById } from "./api";

type CandidateTrelloProps = {
  timeZon: string;
  staffId: number;
};

interface IIntreviewTimeData {
  cnId: number | string,
  beginDate: string
}

interface ICandidatetsData {
  firstName: string,
  lastName: string,
  mainSkill: string,
}

interface IStatus {
  name: string,
}

interface IStatusHistoryData {
  status: IStatus
}

const CandidateTrello: React.FC<CandidateTrelloProps> = ({ timeZon, staffId }) => {

  const [intreviewTimeData, setintreviewTimeData] = useState<IIntreviewTimeData[]>([]);
  const [candidatetsData, setCandidatetsData] = useState<ICandidatetsData[]>([]);
  const [statusHistoryData, setStatusHistoryData] = useState<IStatusHistoryData[]>([]);

  useEffect(() => {
    async function getData() {
      await getCandidateIdByEmpolee(staffId).then(response => {
        setintreviewTimeData(response);
        return response.map((item: any) => item.cnId).sort();
      }).then(condidateIds => {
        getCandidateById(condidateIds).then(response => {
          setCandidatetsData(response);
          return response.map((item: any) => item.id);
        }).then(condidateIds => {
          getStatusCandidateById(condidateIds).then(response => {
            setStatusHistoryData(response.content);
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
