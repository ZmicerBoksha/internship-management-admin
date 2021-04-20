import React, { useMemo } from 'react';
import CandidatesList from './candidate_list/candidates_list';
import ColumnFilter from './candidate_list/columnFilter';

const CandidatesPage: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Candidate',
        columns: [
          {
            Header: 'First Name',
            accessor: 'first_name',
          },
          {
            Header: 'Last Name',
            accessor: 'last_name',
          },
        ],
      },
      {
        Header: 'Contacts',
        columns: [
          {
            Header: 'Phone',
            accessor: 'phone',
            disableFilters: true,
          },
          {
            Header: 'Email',
            accessor: 'email',
            disableFilters: true,
          },
          {
            Header: 'Skype',
            accessor: 'skype',
            disableFilters: true,
          },
        ],
      },
      {
        Header: 'Location',
        columns: [
          {
            Header: 'Country',
            accessor: 'country',
            disableFilters: true,
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
            accessor: 'primary_skills',
            disableFilters: true,
          },
          {
            Header: 'Other technologies',
            accessor: 'other_technologies',
          },
        ],
      },
      {
        Header: 'Education',
        columns: [
          {
            Header: 'Institute',
            accessor: 'education.educational_institution',
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
            accessor: 'english_level',
            disableFilters: true,
          },
          {
            Header: 'CV',
            accessor: 'cv',
            disableFilters: true,
          },
          {
            Header: 'Preferred time for interview',
            accessor: 'time',
            disableFilters: true,
          },
        ],
      },
    ],
    [],
  );

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  return (
    <div>
      <CandidatesList columns={columns} defaultColumn={defaultColumn} />
    </div>
  );
};

export default CandidatesPage;
