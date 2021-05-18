import React from 'react';
import TopCard from './TopCard';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import DescriptionIcon from '@material-ui/icons/Description';
import { Grid } from '@material-ui/core';
import LineChart from './Chart/LineChart';
import useAxios from 'axios-hooks';
interface ICard {
  icon: any;
  title: string;
  quantity: string;
}

const Dashboard: React.FC = () => {
  const [{ data: CandidateData, loading, error }] = useAxios<any>({
    url: `/candidate?itemsPerPage=1000&page=0`,
    method: 'GET',
  });
  if (loading) return <p>Loading...</p>;

  console.log(CandidateData);
  const Candidates = CandidateData.content.map((eventInfo: any) => eventInfo);
  console.log(Candidates);
  const InProcessCount = Candidates.filter((eventInfo: any) => eventInfo.mainSkill === 'Java').length;
  const Rejected = Candidates.filter((eventInfo: any) => eventInfo.mainSkill === 'JavaScript').length;
  const Accepted = Candidates.filter((eventInfo: any) => eventInfo.mainSkill === 'DevOps').length;
  const data: ICard[] = [
    {
      icon: <HelpOutlineOutlinedIcon fontSize="large" style={{ color: 'orange' }} />,
      title: 'IN Process',
      quantity: InProcessCount,
    },
    {
      icon: <CancelOutlinedIcon fontSize="large" style={{ color: 'red' }} />,
      title: 'Rejected',
      quantity: Rejected,
    },
    {
      icon: <CheckCircleOutlinedIcon fontSize="large" style={{ color: 'green' }} />,
      title: 'Accepted',
      quantity: Accepted,
    },
    {
      icon: <DescriptionIcon fontSize="large" style={{ color: 'gray' }} />,
      title: 'Total',
      quantity: InProcessCount + Rejected + Accepted,
    },
  ];
  return (
    <div>
      <Grid container spacing={3}>
        {data.map((detail: ICard) => {
          return (
            <Grid key={detail.title} item xs={12} sm={6} md={3}>
              <TopCard icon={detail.icon} title={detail.title} quantity={detail.quantity} />
            </Grid>
          );
        })}
        <Grid item xs={8}>
          <LineChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
