import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import Table from '../../common/table/table';
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import { candidateEventsApi, candidateService, englishLevels } from '../../../api/api';
import { TCandidate } from '../../../types/types';
import { rowsPerPageOptions } from '../../common/table/tablePagination/tablePagination';
import { technologies } from '../../common/technologies/technologies';
import { countries } from '../../common/countries/countries';

type TUrl = {
  eventId?: string;
};

const CandidatesList: React.FC = () => {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<string>('');
  const { eventId } = useParams<TUrl>();

  const [candidatesList, setCandidatesList] = useState<TCandidate[]>([]);

  const [countRows, setCountRows] = useState<number>(0);

  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(rowsPerPageOptions[0]);

  const fetchCandidatesList = (size: number, page: number, searchParam?: string) => {
    let params = {
      itemsPerPage: size,
      page: page,
      search: searchParams,
    };

    if (eventId) {
      if (!!searchParam) {
        const searchParamList = searchParam?.split(';');
        searchParam = '';
        searchParamList?.map(parametr => {
          searchParam += `candidate.${parametr};`;
        });
      }
      searchParam += `event.id=="${eventId}"`;

      candidateEventsApi.getAllCandidateEvent(page, size, searchParam).then(response => {
        const candidateForEventList: TCandidate[] = [];

        for (let i = 0; i < response.data.content.length; i++) {
          candidateForEventList.push(response.data.content[i].candidate);
        }

        setCandidatesList(candidateForEventList);
        setCountRows(response.data.totalElements);
      });
    } else {
      candidateService
        .getAllCandidates(params)
        .then(({ data }) => {
          setCandidatesList(data.content);
          setCountRows(data.totalElements);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchCandidatesList(itemsPerPage, page, searchParams);
  }, [page, itemsPerPage, searchParams, eventId]);

  const handleClick = (instance: any) => {
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
            startHide: true,
            selectValues: countries,
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
            selectValues: technologies,
          },
          {
            Header: 'Other technologies',
            accessor: 'otherSkills',
            selectValues: technologies,
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
            selectValues: englishLevels.map(value => value.backName),
          },
          {
            Header: 'CV',
            accessor: `candidateResume.name`,
            disableFilters: true,
          },
          {
            Header: 'Preferred time for interview',
            accessor: 'time',
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
      setSearchParams={setSearchParams}
      countRows={countRows}
      pageNumberForBack={page}
      setPage={setPage}
      rowsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
    />
  );
};

export default CandidatesList;
