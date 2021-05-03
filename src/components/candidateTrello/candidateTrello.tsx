import { Grid, Typography } from "@material-ui/core";
import CandidateMiniCard from "../canditadeMiniCard/candidateMiniCard";
import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { POST, PREFIX } from "../../constants";
import { getCandidateById, getCandidateIdByEmpolee, getStatusCandidateById } from "./api";

type CandidateTrelloProps = {
  timeZon: string;
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

const CandidateTrello: React.FC<CandidateTrelloProps> = ({ timeZon }) => {

  const [intreviewTimeData, setintreviewTimeData] = useState([]);
  const [candidatetsData, setCandidatetsData] = useState([]);
  const [statusHistoryData, setStatusHistoryData] = useState([]);

  useEffect(() => {
    async function getData() {
      await getCandidateIdByEmpolee(2).then(response => {
        setintreviewTimeData(response);
        return response.map((item: any) => item.cnId);
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

  intreviewTimeData?.forEach((item:IIntreviewTimeData) => {
    mass.push({
      ["id"]: item.cnId, ["interviewDate"]: item.beginDate
    });
  });
  console.log(intreviewTimeData);

 /* candidatetsData?.forEach((item:ICandidatetsData, index: number) => {
      mass[index]["firstName"] = candidatetsData[index].firstName;
      mass[index]["lastName"] = candidatetsData[index].lastName;
      mass[index]["primaryTechnology"] = candidatetsData[index].mainSkill;
  });
  console.log(candidatetsData);

  */


  for (let i = 0; i < candidatetsData?.length; i++) {
    // @ts-ignore
    mass[i]["firstName"] = candidatetsData[i].firstName;
    // @ts-ignore
    mass[i]["lastName"] = candidatetsData[i].lastName;
    // @ts-ignore
    mass[i]["primaryTechnology"] = candidatetsData[i].mainSkill;
  }

  for (let i = 0; i < statusHistoryData?.length; i++) {
    // @ts-ignore
    mass[i]["status"] = statusHistoryData[i].status.name;
  }

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
          {notRevived.map((cadidate, i) => (<CandidateMiniCard key={i} timeZon={timeZon} candidate={cadidate} />))}
        </div>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" className="subtitle subtitle--revived" noWrap>
          Reviewed candidates
        </Typography>
        {revived.map((cadidate, i) => (<CandidateMiniCard key={i} timeZon={timeZon} candidate={cadidate} />))}
      </Grid>
    </Grid>
  );
};

export default CandidateTrello;
