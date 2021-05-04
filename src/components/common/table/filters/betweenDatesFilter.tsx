import { InputLabel, TextField } from '@material-ui/core';
import { FunctionComponent } from 'react';
import { ColumnInstance } from 'react-table';

type TBetweenDatesFilter = {
  column: ColumnInstance;
};

const BetweenDatesFilter: FunctionComponent<TBetweenDatesFilter> = ({ column }) => {
  const { filterValue = [], render, preFilteredRows, setFilter, id, filter } = column;
  return (
    <>
      <InputLabel htmlFor={id} shrink>
        {render('Header')}
      </InputLabel>
      <div>
        <TextField
          id={`${id}_1`}
          placeholder="Start date"
          value={filterValue[1] || ''}
          type="date"
          onChange={event => {
            const startDate = event.target.value;
            setFilter((dateValues: any[] = []) => [filter, startDate || undefined, dateValues[2]]);
          }}
        />
        to
        <TextField
          id={`${id}_2`}
          placeholder="Finish date"
          type="date"
          value={filterValue[2] || ''}
          onChange={event => {
            const finishDate = event.target.value;
            setFilter((dateValues: any[] = []) => [filter, dateValues[1], finishDate || undefined]);
          }}
        />
      </div>
    </>
  );
};

export default BetweenDatesFilter;
