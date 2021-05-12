import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import useAxios from 'axios-hooks';
import Table from '../../common/table/table';
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import { candidateService } from "../../../api/api";


export type TCandidate = {
  institution: string;
  faculty: string;
  speciality: string;
  email: string;
  englishLevel: string;
  firstName: string;
  id: number;
  experience: string;
  expertise: string;
  education: string;
  location: string;
  lastName: string;
  country: string;
  phone: string;
  rsmId: number;
  skype: string;
};

const CandidatesList: React.FC = () => {
  const history = useHistory();
  const [candidatesList, setCandidatesList] = useState<TCandidate[]>([]);

  const fetchCandidatesList = (size: number, page: number) => {
    let params = {
      itemsPerPage: size,
      page: page,
    };

    candidateService
      .getAllCandidates(params)
      .then(( {data} ) => {
        setCandidatesList(data);
      })
      .catch((err:any) => {
        console.log(err);
      });
  };

  const [{ data: candidateResume /*loading: candidatesListLoading, error: candidatesListError*/ }] = useAxios(
    `/resume?search=`,
  );

  const handleClick = (instance: any) => {
    const candidateID = instance.rows[0].original.id;
    history.push(`/candidate/${candidateID}`);
  };

  const data = useMemo(() => candidatesList || [], [candidatesList]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Candidate',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Contacts',
        columns: [
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Skype',
            accessor: 'skype',
          },
        ],
      },
      {
        Header: 'Location',
        columns: [
          {
            Header: 'Country',
            accessor: 'country',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'City',
            accessor: 'city',
          },
        ],
      },
      {
        Header: 'Technical skills',
        columns: [
          {
            Header: 'Main skill',
            accessor: 'mainSkill',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Other technologies',
            accessor: 'otherSkills',
          },
        ],
      },
      {
        Header: 'Education',
        columns: [
          {
            Header: 'Institute',
            accessor: 'institution',
          },
          {
            Header: 'Faculty',
            accessor: 'faculty',
          },
          {
            Header: 'Speciality',
            accessor: 'speciality',
          },
        ],
      },
      {
        Header: 'Other information',
        columns: [
          {
            Header: 'English level',
            accessor: 'englishLevel',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'CV',
            accessor: `candidateResume.name`,
            disableFilters: true,
          },
          {
            Header: 'Preferred time for interview',
            accessor: 'time',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },
    ],
    [],
  );

  return (
    <Table
      name={'Candidates table'}
      columns={columns}
      data={data}
      onEdit={handleClick}
      fetchRequest={fetchCandidatesList}
    />
  );
};

export default CandidatesList;
