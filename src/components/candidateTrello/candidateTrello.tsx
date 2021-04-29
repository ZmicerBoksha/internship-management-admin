import { Grid, Typography } from '@material-ui/core';
import CandidateMiniCard from '../canditadeMiniCard/candidateMiniCard';
import React from 'react';
import useAxios from 'axios-hooks';
import { POST, PREFIX } from '../../constants';

type CandidateTrelloProps = {
  timeZon: string;
};

let candidateMiniCard = {
  id: '1',
  firstName: '',
  lastName: '',
  interviewDate: '',
  primaryTechnology: '',
  status: '',
};

const CandidateTrello: React.FC<CandidateTrelloProps> = ({ timeZon }) => {
  const [{ data: candidateId, loading, error }] = useAxios(`${PREFIX}/interviewtime?search=empId==2`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  let candidateArray = candidateId.map((item: any) => item.id);
  /*
  const [{ data:condidateinfo }, refetch] = useAxios(    {}
  );
  refetch({
    url: `${PREFIX}/candidate?search=id=in=(${candidateId.join()})`,
    method: "GET"
  });

 */

  console.log(candidateId);
  console.log(candidateArray);
  return (
    <Grid container xs={12} justify="center">
      <Grid item xs={6}>
        <Typography variant="h5" className="subtitle subtitle--notRevived" noWrap>
          Not reviewed candidates
        </Typography>
        <div>
          <CandidateMiniCard timeZon={timeZon} />
        </div>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" className="subtitle subtitle--revived" noWrap>
          Reviewed candidates
        </Typography>
        <div></div>
      </Grid>
    </Grid>
  );
};

export default CandidateTrello;
