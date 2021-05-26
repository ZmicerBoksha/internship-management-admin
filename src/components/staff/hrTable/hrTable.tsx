import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Table from '../../common/table/table';
import useAxios from 'axios-hooks';
import { PREFIX, HR } from '../../../constants';
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { rowsPerPageOptions } from '../../common/table/tablePagination/tablePagination';
import { countries } from '../../common/countries/countries';

const HrTable: React.FC = () => {
  const [{ data: hrList }, sendRequest] = useAxios(`${PREFIX}employees?search=type==${HR}`);

  const [searchParams, setSearchParams] = useState<string>('');
  const [dataList, setDataList] = useState<any[]>([]);
  const [countRows, setCountRows] = useState<number>(0);

  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(rowsPerPageOptions[0]);
  async function getData(page: number, itemsPerPage: number, searchParam?: string) {}

  useEffect(() => {
    let urlForRequest = `${PREFIX}employees?itemsPerPage=${itemsPerPage}&page=${page}&search=type==${HR}`;
    if (searchParams.length) urlForRequest += `;${searchParams}`;

    sendRequest({
      method: 'GET',
      url: urlForRequest,
    }).then(response => {
      setDataList(response.data.content);
      setCountRows(response.data.totalElements);
      console.log(response);
    });
  }, [page, itemsPerPage, searchParams]);

  const history = useHistory();

  const addStaff = useCallback(() => {
    history.push(`/staff/add`);
  }, []);

  const editStaff = (instance: any) => {
    const StaffID = instance.rows[0].original.id;
    history.push(`/staff/${StaffID}`);
  };

  const deleteStaff = (instance: any) => {
    const StaffID = instance.rows[0].original.id;
    console.log(instance);
    sendRequest({
      method: 'DELETE',
      url: `${PREFIX}employees/${StaffID}`,
    });
  };

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
            Filter: SelectColumnFilter,
            filter: 'includes',
            selectValues: countries,
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
              <Button
                style={{ marginTop: '10px' }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  window.location.href = `/staff/hr/${cell.row.original.id}`;
                }}
              >
                {'View'}
              </Button>
            ),
          },
          /*   {
               Header: 'Delete',
               accessor: '',
               disableFilters: true,
               Cell: ({ cell }: any) => (
                 <button
                   value={cell.row.id}
                   onClick={() => {
                     sendRequest({
                       method: 'DELETE',
                       url: `${PREFIX}employees/${cell.row.original.id}`,
                     });
                   }}
                 >
                   {'Delete'}
                   {cell.row.values.age}{' '}
                 </button>
               ),
             },

           */
        ],
      },
    ],
    [],
  );

  return (
    <Table
      name={'HR table'}
      onDelete={deleteStaff}
      onAdd={addStaff}
      onEdit={editStaff}
      columns={columns}
      data={dataList}
      setSearchParams={setSearchParams}
      countRows={countRows}
      pageNumberForBack={page}
      setPage={setPage}
      rowsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
    />
  );
};

export default HrTable;
