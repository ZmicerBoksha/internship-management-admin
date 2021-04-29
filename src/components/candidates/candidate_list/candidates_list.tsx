import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import useAxios from 'axios-hooks';
import Table from '../../common/table/table';
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';

/*type TEducation = {
  educational_institution: string;
  faculty: string;
  speciality: string;
};*/

export type TCandidate = {
  education: string;
  email: string;
  englishLevel: string;
  experience: string;
  expertise: string;
  firstName: string;
  id: number;
  lastName: string;
  location: string;
  phone: string;
  rsmId: number;
  skype: string;
};

const CandidatesList: React.FC = () => {
  const history = useHistory();

  const [{ data: candidatesList /*loading: candidatesListLoading, error: candidatesListError*/ }] = useAxios(
    '/candidate',
  );

  console.log(candidatesList);

  const handleClick = (instance: any) => {
    const candidateID = instance.selectedFlatRows[0].original!.id;
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
            accessor: 'location',
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
            accessor: 'expertise',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Other technologies',
            accessor: 'experience',
          },
        ],
      },
      {
        Header: 'Education',
        columns: [
          {
            Header: 'Institute',
            accessor: 'education',
            disableFilters: true,
          },
          {
            Header: 'Faculty',
            accessor: 'education.faculty',
            disableFilters: true,
          },
          {
            Header: 'Speciality',
            accessor: 'education.speciality',
            disableFilters: true,
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
            accessor: 'cv',
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

  return <Table name={'Candidates table'} columns={columns} data={data} onEdit={handleClick} />;
};

export default CandidatesList;
