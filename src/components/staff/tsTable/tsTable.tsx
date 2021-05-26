import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAxios from 'axios-hooks';
import { PREFIX, TS } from '../../../constants';
import Table from '../../common/table/table';
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { rowsPerPageOptions } from '../../common/table/tablePagination/tablePagination';
import { countries } from '../../common/countries/countries';

const TsTable: React.FC = () => {
  const [{ data: TSList }, sendRequest] = useAxios(`${PREFIX}employees?search=type==${TS}`);

  const [searchParams, setSearchParams] = useState<string>('');
  const [dataList, setDataList] = useState<any[]>([]);
  const [countRows, setCountRows] = useState<number>(0);

  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(rowsPerPageOptions[0]);

  useEffect(() => {
    let urlForRequest = `${PREFIX}employees?itemsPerPage=${itemsPerPage}&page=${page}&search=type==${TS}`;
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
    sendRequest({
      method: 'DELETE',
      url: `${PREFIX}employees/${StaffID}`,
    });
  };

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
            Header: 'Primary skill',
            accessor: 'primaryTechnology',
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
                value={cell.row.id}
                onClick={() => {
                  window.location.href = `/staff/ts/${cell.row.original.id}`;
                }}
              >
                {'View'}
              </Button>
            ),
          },
        ],
      },
    ],
    [],
  );

  return (
    <Table
      name={'TsTable table'}
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

export default TsTable;
