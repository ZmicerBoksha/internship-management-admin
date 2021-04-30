import { TextField } from '@material-ui/core';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ColumnInstance } from 'react-table';

interface DefaultColumnFilterProps {
  column: ColumnInstance;
  columns: ColumnInstance[];
}

const DefaultColumnFilter: FunctionComponent<DefaultColumnFilterProps> = ({ columns, column }) => {
  const { filterValue, setFilter, render } = column;

  // Coomit delete after create filters
  // let filterState = {};
  // columns.forEach(column => {
  //   const key = column.id;
  //   filterState[ key ] = ''
  // }) 

  const [value, setValue] = useState('');
  const history = useHistory();
  const [filtersValue, setFiltersValue] = useState({
    // ...filterState
  })

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // Coomit delete after create filters
  // const startSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   history.push({
  //     search: `${column.id}=q=${event.target.value}`,
  //   });
  // };

  // ensure that reset loads the new value
  // useEffect(() => {
  //   setValue(filterValue || '');
  // }, [filterValue]);

  return (
    <>
      <TextField
        value={value}
        onChange={handleFilterChange}
        // onBlur={e => {
        //   // setFilter(e.target.value || undefined);
        // }}
        onBlur={event => {
          history.push({
            search: `${column.id}=q=${event.target.value}`,
          });
        }}
        label={render('Header')}
        type="search"
      />
    </>
  );
};

export default DefaultColumnFilter;
