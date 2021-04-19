import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

type TGlobalFilterProps = {
  column: any;
};

const ColumnFilter: React.FC<TGlobalFilterProps> = ({
  column: { filterValue, setFilter },
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <SearchIcon />
      <TextField
        id="outlined-search"
        label="Search"
        type="search"
        variant="outlined"
        value={filterValue || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFilter(e.target.value)
        }
      />
    </div>
  );
};

export default ColumnFilter;
