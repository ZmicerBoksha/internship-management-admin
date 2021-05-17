import React, { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import Table from '../../common/table/table';
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import { candidateService, candidateEventsApi } from '../../../api/api';
import { TCandidate } from '../../../types/types';

type TCandidateEvents = {
  eventId?: string;
};

const CandidatesList: React.FC = () => {
  const history = useHistory();
  const { eventId } = useParams<TCandidateEvents>();
  console.log(eventId);

  const [candidatesList, setCandidatesList] = useState<TCandidate[]>([]);

  const fetchCandidatesList = (size: number, page: number) => {
    let params = {
      itemsPerPage: size,
      page: page,
    };

    if (!!eventId) {
      candidateEventsApi.getAllCandidateEvent(page, size, eventId);
    } else {
      candidateService
        .getAllCandidates(params)
        .then(({ data }) => {
          setCandidatesList(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleClick = (instance: any) => {
    console.log(instance);
    const candidateID = instance.selectedFlatRows[0].original.id;
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
