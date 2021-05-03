import { MenuItem, TextField } from '@material-ui/core';
import { FunctionComponent, useMemo } from 'react';

interface SelectColumnFilterProps {
  column: any;
}

export const SelectColumnFilter: FunctionComponent<SelectColumnFilterProps> = ({ column }) => {
  const { filterValue, preFilteredRows, setFilter, id, render } = column;
  const options = useMemo(() => {
    const options = new Set<string | number>();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...Array.from(options.values())];
  }, [id, preFilteredRows]);
  return (
    <>
      <TextField
        select
        label={render('Header')}
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      >
        <MenuItem value={''}>All</MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
