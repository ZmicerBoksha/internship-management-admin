import { MenuItem, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FunctionComponent, useMemo } from 'react';
import { ColumnInstance } from 'react-table';
import { TBackendModelWithGoodText } from '../../../../api/api';

interface SelectColumnFilterProps {
  column: ColumnInstance & { selectValues: TBackendModelWithGoodText[] };
}

export const SelectColumnFilterEvents: FunctionComponent<SelectColumnFilterProps> = ({ column }) => {
  const { filterValue = [], preFilteredRows, setFilter, id, render, filter, selectValues } = column;
  console.log(column);

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
          debugger;
          setFilter(() => [filter, newValue || undefined]);
        }}
        options={selectValues}
        autoHighlight
        getOptionLabel={option => option.showAs}
        renderOption={option => option.showAs}
        renderInput={params => <TextField {...params} label={render('Header')} />}
      />

      {/* <Autocomplete
        options={selectValues}
        autoHighlight
        getOptionLabel={option => option.showAs}
        renderOption={(option) => (
          <>
            {option.showAs}
          </>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      /> */}
    </>
  );
};
