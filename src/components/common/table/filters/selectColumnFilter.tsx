import { MenuItem, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FunctionComponent, useMemo } from 'react';
import { ColumnInstance } from 'react-table';

interface SelectColumnFilterProps {
  column: ColumnInstance & { selectValues: string[] };
}

export const SelectColumnFilter: FunctionComponent<SelectColumnFilterProps> = ({ column }) => {
  const { filterValue = [], preFilteredRows, setFilter, id, render, filter } = column;
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
        value={filterValue[1] || ''}
        onChange={event => {
          const valueForSearch = event.target.value;
          setFilter(() => [filter, valueForSearch || undefined]);
        }}
        options={selectValues || frontSelectValues}
        renderInput={params => <TextField {...params} label={render('Header')} />}
      />
    </>
  );
};
