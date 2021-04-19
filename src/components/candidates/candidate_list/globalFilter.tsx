import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

type TGlobalFilterProps = {
    filter: string,
    setFilter: Function
}

const GlobalFilter: React.FC<TGlobalFilterProps> = ({ filter, setFilter }) => {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <SearchIcon/>
            <TextField
                id="outlined-search"
                label="Search"
                type="search"
                variant="outlined"
                value={filter || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
            />
        </div>
    );
};

export default GlobalFilter;
