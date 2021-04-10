import React, { useEffect, useState } from 'react';
import { Column, useTable } from 'react-table';
import { useHistory } from 'react-router-dom';
import './styles.css';

type TEducation = {
    educational_institution: string,
    faculty: string,
    speciality: string
};

export type TCandidate = {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    skype: string,
    english_level: string,
    country: string,
    city: string,
    primary_skills: string,
    other_technologies: Array<string>,
    education: TEducation,
    graduation_date: string,
    cv: string,
    date: Date,
    time: string
};

type TCandidateListProps = {
    columns: Column<TCandidate>[]
}

const CandidatesList: React.FC<TCandidateListProps> = ({ columns }) => {
    const [candidatesList, setCandidatesList] = useState<Array<TCandidate>>([]);
    let history = useHistory();

    const handleClick = (id: number) => {
        history.push(`/candidates/${id}`);
    }

    let fetchCandidates = () => {
        fetch('http://localhost:3000/candidates')
        .then((response) => {
            return response.json();
        })
        .then((data: Array<TCandidate>) => {
            setCandidatesList(data);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchCandidates();
    }, []);

    const data = React.useMemo(() => candidatesList,
        [candidatesList]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns, data
    })

    return (
        <div className="candidates">
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td
                                    onClick={() => handleClick(row.original.id)}
                                    {...cell.getCellProps()}
                                >
                                    {cell.render('Cell')}
                                </td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default CandidatesList;
