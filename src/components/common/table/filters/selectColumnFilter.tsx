import { MenuItem, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FunctionComponent, useMemo } from 'react';
import { ColumnInstance } from 'react-table';

interface SelectColumnFilterProps {
  column: ColumnInstance & { selectValues: string[] };
}

export const SelectColumnFilter: FunctionComponent<SelectColumnFilterProps> = ({ column }) => {
  const { filterValue = [], preFilteredRows, setFilter, id, render, filter, selectValues } = column;

  const frontSelectValues = useMemo(() => {
    const options = new Set<string | number>();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });

    return [...Array.from(options.values())];
  }, [id, preFilteredRows]);

  return (
    <>
      <Autocomplete
        value={filterValue[1] || ''}
        onChange={(event, newValue: string | null) => {
          setFilter(() => [filter, newValue || undefined]);
        }}
        options={selectValues || frontSelectValues}
        renderInput={params => <TextField {...params} label={render('Header')} />}
      />
    </>
  );
};
