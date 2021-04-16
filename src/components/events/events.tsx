import { FunctionComponent, useCallback, useMemo } from 'react';
import { GROUPED_COLUMNS } from './columns/GROUPED_COLUMNS';

import dataJson from './data.json';
import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';
import Table from '../common/table/Table';
import { TableInstance } from 'react-table';
import { useHistory } from 'react-router';

const useStyles = makeStyles( () => {
  return createStyles({
    pageWrap : {
      position: 'relative',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35
    }
  })
})

interface IEvent {
  id?: string
}

const Events: FunctionComponent = () => {
  const classes = useStyles();

  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => dataJson.events, []);

  const history = useHistory();

  const tempFuncCallback = useCallback(
    (instance: TableInstance<IEvent>) => {
      const eventID = instance.selectedFlatRows[0].original!.id;
      history.push(`/event-form/${eventID}`)

      console.log(
        'Template out text',
          //hasOwnProperty('id')
          eventID
      )
    },
    []
  )

  return (
    <div className={classes.pageWrap}>
      <CssBaseline />  
      <Table
        name={'Events table'}
        columns={columns}
        data={data}
        onAdd={tempFuncCallback}
        onEdit={tempFuncCallback}
      />
    </div>
  )
};

export default Events;
