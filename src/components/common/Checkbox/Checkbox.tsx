import { Checkbox, createStyles, makeStyles, styled, Theme } from "@material-ui/core";
import { FunctionComponent, memo } from "react";
import { TableToggleAllRowsSelectedProps, TableToggleRowsSelectedProps } from "react-table";

const areEqual = (prevProps: any, nextProps: any) => {
  return prevProps.checked === nextProps.checked && prevProps.indeterminate === nextProps.indeterminate;
}

// const useStyles = makeStyles((theme: Theme) => {
//   return createStyles({
//     custom_checkbox: {
//       fontSize: '1rem',
//       margin: '-8px 0 -8px -15px',
//       padding: '8px 9px',
//       '& svg': {
//         width: '20px',
//         height: '20px',
//       },
//       '&:hover': {
//         backgroundColor: 'transparent',
//       },
//     }
//   })
// })

// const HeaderCheckboxComponent: FunctionComponent<Partial<TableToggleAllRowsSelectedProps> | undefined> = () => {  
//   const classes = useStyles({});

//   return (
//     <Checkbox 
//       className={classes.custom_checkbox}
//       color="primary"
//     />
//   );
// };
  
// export const HeaderCheckbox = memo(
//   HeaderCheckboxComponent,
//   areEqual
// );  


// const RowCheckboxComponent: FunctionComponent<Partial<TableToggleRowsSelectedProps> | undefined> = () => {  
//   const classes = useStyles({});

//   return (
//     <Checkbox 
//       className={classes.custom_checkbox}
//       color="primary"
//     />
//   );
// };
  
// export const RowCheckbox = memo(
//   RowCheckboxComponent,
//   areEqual
// ); 

export const HeaderCheckbox = memo(
  styled(Checkbox)({
    color: "primary",
    fontSize: '1rem',
    margin: '-8px 0 -8px -15px',
    padding: '8px 9px',
    '& svg': {
      width: '20px',
      height: '20px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
  areEqual
);
  
export const RowCheckbox = memo(
  styled(Checkbox)({
    fontSize: '1rem',
    margin: '-8px 0 -8px -15px',
    padding: '8px 9px',
    '& svg': {
      width: '20px',
      height: '20px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
  areEqual
);