import { TextField } from "@material-ui/core";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react"

interface DefaultColumnFilterProps {
  columns: any,
  column: any
};

const DefaultColumnFilter: FunctionComponent<DefaultColumnFilterProps> = ({ columns, column }) => { 
  const { filterValue, setFilter, render } = column
  const [value, setValue] = useState(filterValue || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  };

  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || '')
  }, [filterValue])

  return (
    <>
      <TextField 
        value={value}
        onChange={handleChange}
        onBlur={(e) => {
          setFilter(e.target.value || undefined)
        }}
        label={render('Header')}
        type="search"  
      />
    </>
  )
}

export default DefaultColumnFilter
