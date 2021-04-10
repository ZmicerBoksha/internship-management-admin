import React from 'react';
import CandidatesList from './candidate_list/candidates_list';

const CandidatesPage: React.FC = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Candidate',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'first_name',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'last_name',
                    },
                ],
            },
            {
                Header: 'Contacts',
                columns: [
                    {
                        Header: 'Phone',
                        accessor: 'phone',
                    },
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Skype',
                        accessor: 'skype',
                    },
                ],
            },
            {
                Header: 'Location',
                columns: [
                    {
                        Header: 'Country',
                        accessor: 'country',
                    },
                    {
                        Header: 'City',
                        accessor: 'city',
                    }
                ],
            },
            {
                Header: 'Technical skills',
                columns: [
                    {
                        Header: 'Main skill',
                        accessor: 'primary_skills',
                    },
                    {
                        Header: 'Other technologies',
                        accessor: 'other_technologies',
                    },
                ],
            },
            {
                Header: 'Education',
                columns: [
                    {
                        Header: 'Institute',
                        accessor: 'education.educational_institution',
                    },
                    {
                        Header: 'Faculty',
                        accessor: 'education.faculty',
                    },
                    {
                        Header: 'Speciality',
                        accessor: 'education.speciality',
                    },
                ],
            },
            {
                Header: 'Other information',
                columns: [
                    {
                        Header: 'English level',
                        accessor: 'english_level'
                    },
                    {
                        Header: 'CV',
                        accessor: 'cv'
                    },
                    {
                        Header: 'Preferred time for interview',
                        accessor: 'time'
                    },
                ]
            }
        ],
        []
    )

    return (
        <div>
            <CandidatesList columns={columns} />
        </div>
    );
};

export default CandidatesPage;
