import React, { useCallback, useMemo } from "react";
import useAxios from 'axios-hooks';
import { PREFIX, TS } from "../../../constants";
import Table from '../../common/table/table';
import { SelectColumnFilter } from "../../common/table/filters/selectColumnFilter";
import { useHistory } from "react-router";

const TsTable: React.FC = () => {
  const [{ data: TSList }, sendRequest] = useAxios(`${PREFIX}employees?search=type==${TS}`);
  const history = useHistory();
  const addStaff = useCallback(() => {
    history.push(`/staff/add`);
  }, []);

  const editStaff = (instance: any) => {
    const StaffID = instance.rows[0].original.id;
    history.push(`/staff/${StaffID}`);
  };

  const deleteStaff=(instance: any)=>{
    const StaffID = instance.rows[0].original.id;
    sendRequest({
      method: 'DELETE',
      url: `${PREFIX}employees/${StaffID}`,
    });
  }


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
          },
          {
            Header: 'City',
            accessor: 'locationCity',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Time Zone',
            accessor: 'timezone',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Primary skill',
            accessor: 'primaryTechnology',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'View',
            accessor: '',
            disableFilters: true,
            Cell: ({ cell }: any) => (
              <button
                value={cell.row.id}
                onClick={() => {
                  window.location.href = `/staff/ts/${cell.row.original.id}`;
                }}
              >
                {'View'}
              </button>
            ),
          },
        ],
      },
    ],
    [],
  );

  return <Table name={'TsTable table'}  onDelete={deleteStaff} onAdd={addStaff}  onEdit={editStaff} columns={columns} data={data} />;
};

export default TsTable;
