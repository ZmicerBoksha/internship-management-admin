import { createStyles, fade, InputBase, makeStyles, Theme } from '@material-ui/core';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { TableInstance, useAsyncDebounce } from 'react-table';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: 35,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(224, 224, 224, 1)',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  });
});

type GlobalFilterProps = {
  instance: TableInstance;
};

const GlobalFilter: FunctionComponent<GlobalFilterProps> = ({ instance }) => {
  const classes = useStyles();

  const { globalFilter, setGlobalFilter } = instance;

  const history = useHistory();

  const [value, setValue] = useState('');
  // Comment delete after create filters
  // const onChangeInput = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined);
  // }, 1000);

  

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    const searchParam = `global==${newValue}`;
    history.push({
      search: `${searchParam}`,
    });
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onChangeInput}
        value={value}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default GlobalFilter;
