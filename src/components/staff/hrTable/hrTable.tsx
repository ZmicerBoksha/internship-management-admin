import React, { useCallback, useMemo } from 'react';
import Table from '../../common/table/table';
import useAxios from 'axios-hooks';
import { PREFIX, HR } from "../../../constants";
import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

const HrTable: React.FC = () => {
  const [{ data: hrList ,response}, sendRequest] = useAxios(`${PREFIX}employees?search=type==${HR}`);

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
    console.log(instance);
    sendRequest({
      method: 'DELETE',
      url: `${PREFIX}employees/${StaffID}`,
    });
    console.log(response)
  }

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
            Header: 'View',
            accessor: '',
            disableFilters: true,
            Cell: ({ cell }: any) => (
              <Button style={{ marginTop: '10px' }} variant="contained" color="primary" type="submit"


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

  return <Table name={'HR table'}
                onDelete={deleteStaff} onAdd={addStaff}  onEdit={editStaff} columns={columns}  data={data} />;
};

export default HrTable;
