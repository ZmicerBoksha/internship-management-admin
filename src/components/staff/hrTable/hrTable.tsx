import React, { useMemo } from 'react';
import Table from '../../common/table/table';
import useAxios from 'axios-hooks';
import { PREFIX } from '../../../constants';

const HrTable: React.FC = () => {
  const [{ data: hrList }, sendRequest] = useAxios(`${PREFIX}/employees`);

  const data = useMemo(() => hrList?.content || [], [hrList?.content]);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
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
        Header: 'Details',
        columns: [
          {
            Header: 'Country',
            accessor: 'locationCountry',
          },
          {
            Header: 'City',
            accessor: 'locationCity',
          },
          {
            Header: 'Time Zone',
            accessor: 'timezone',
          },
          {
            Header: 'View',
            accessor: '',
            disableFilters: true,
            Cell: ({ cell }: any) => (
              <button
                value={cell.row.id}
                onClick={() => {
                  window.location.href = `/staff/hr/${cell.row.original.id}`;
                }}
              >
                {'View'}
              </button>
            ),
          },
          {
            Header: 'Delete',
            accessor: '',
            disableFilters: true,
            Cell: ({ cell }: any) => (
              <button
                value={cell.row.id}
                onClick={() => {
                  sendRequest({
                    method: 'DELETE',
                    url: `${PREFIX}/employees/${cell.row.original.id}`,
                  });
                }}
              >
                {'Delete'}
                {cell.row.values.age}{' '}
              </button>
            ),
          },
        ],
      },
    ],
    [],
  );

  return <Table name={'HR table'} columns={columns} data={data} />;
};

export default HrTable;
