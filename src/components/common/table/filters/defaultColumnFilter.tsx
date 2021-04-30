import { TextField } from '@material-ui/core';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

interface DefaultColumnFilterProps {
  columns: any;
  column: any;
}

const DefaultColumnFilter: FunctionComponent<DefaultColumnFilterProps> = ({ columns, column }) => {
  const { filterValue, setFilter, render } = column;
  const [value, setValue] = useState(filterValue || '');

  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const startSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(column.id);
    history.push({
      search: `${column.id}=q=${event.target.value}`,
    });
  };
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  return (
    <>
      <TextField
        value={value}
        onChange={handleChange}
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
