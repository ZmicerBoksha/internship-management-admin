import { TextField } from '@material-ui/core';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { ColumnInstance } from 'react-table';

interface DefaultColumnFilterProps {
  column: ColumnInstance;
  columns: ColumnInstance[];
}

const DefaultColumnFilter: FunctionComponent<DefaultColumnFilterProps> = ({ columns, column }) => {
  const { id, filterValue, setFilter, render, filter } = column;

  console.log(filterValue);
  const [value, setValue] = useState(filterValue || '');
  console.log(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(filterValue || '')
  }, [filterValue])

  return (
    <TextField
      name={id}
      label={render('Header')}
      value={value}
      onChange={handleChange}
      onBlur={event => {
        setFilter(() => [event.target.value || undefined]);
      }}
      type="search"
    />
  );
};

export default DefaultColumnFilter;
