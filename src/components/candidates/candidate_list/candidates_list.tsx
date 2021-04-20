import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, useFilters, Column } from 'react-table';
import { useHistory } from 'react-router-dom';
import './styles.css';
import GlobalFilter from './globalFilter';
import useAxios from 'axios-hooks';

type TEducation = {
  educational_institution: string;
  faculty: string;
  speciality: string;
};

export type TCandidate = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  skype: string;
  english_level: string;
  country: string;
  city: string;
  primary_skills: string;
  other_technologies: string[];
  education: TEducation;
  graduation_date: string;
  cv: string;
  date: Date;
  time: string;
};

type TCandidateListProps = {
  columns: Column<TCandidate>[];
  defaultColumn: any;
};

const CandidatesList: React.FC<TCandidateListProps> = ({ columns, defaultColumn }) => {
  const history = useHistory();

  const [{ data: candidatesList, loading: candidatesListLoading, error: candidatesListError }] = useAxios('/candidate');

  console.log(candidatesList);

  const handleClick = (id: number) => {
    history.push(`/candidate/${id}`);
  };

  const data = useMemo(() => candidatesList || [], [candidatesList]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
  );

  const { globalFilter }: any = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="candidates">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td onClick={() => handleClick(row.original.id)} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CandidatesList;
