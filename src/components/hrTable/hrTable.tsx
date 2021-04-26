import React, {MouseEventHandler} from 'react';
import CreateTable from "../table/table";
import makeData from "../table/makeData";

// @ts-ignore

const HR__TABLE = [
    {
        Header: "Name",
        columns: [
            {
                Header: "Name",
                accessor: "firstName"
            },

        ]
    },
    {
        Header: "Info",
        columns: [
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Visits",
                accessor: "visits"
            },
            {
                Header: "Status",
                accessor: "status"
            },
            {
                Header: "Profile Progress",
                accessor: "progress"
            },
            {
                Header: "points",
                accessor: "score",
                Cell: ({cell}: any) => (
                    <button value={cell.row.id}> {cell.row.id}
                        {cell.row.values.name}
                    </button>)
            },
            {
                Header: "poins",
                accessor: "",
                Cell: ({cell}: any) => (
                    <button value={cell.row.id}  onClick={()=>{window.location.href=(`/staff/hr/${cell.row.id}`)}}> {cell.row.values.age}  </button>)
            }
        ]
    }
]


const HrTable: React.FC = () => {

    return CreateTable(HR__TABLE, makeData(30), makeData(20));
};

export default HrTable;
