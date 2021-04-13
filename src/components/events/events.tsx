import { FunctionComponent, useCallback, useMemo } from 'react';
import { GROUPED_COLUMNS } from './columns/GROUPED_COLUMNS';

import dataJson from './data.json';
import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';
import Table from '../common/Table/Table';
import { TableInstance } from 'react-table';

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

const Events: FunctionComponent = () => {
  const classes = useStyles({});

  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => dataJson.events, []);

  const tempFuncCallback = useCallback(
    (instance: TableInstance) => {
      console.log(
        'Template out text',
        instance
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