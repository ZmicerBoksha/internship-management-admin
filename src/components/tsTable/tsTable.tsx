import React, { useMemo } from 'react';
import useAxios from 'axios-hooks';
import { PREFIX } from '../../constants';
import Table from '../common/Table/Table';

const TsTable: React.FC = () => {
  const [{ data: TSList }, sendRequest] = useAxios(`${PREFIX}/employees`);

  const data = useMemo(() => TSList?.content || [], [TSList?.content]);
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
            disableFilters: true,
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
            Header: 'Primary skill',
            accessor: 'primarySkill',
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
                  console.log(cell.row.original.id);
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

  return <Table name={'TsTable table'} columns={columns} data={data} />;
};

export default TsTable;
