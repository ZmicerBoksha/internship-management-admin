import { SelectColumnFilter } from "../../common/Table/filters/SelectColumnFilter";


export const Columns = [
  {
    Header: 'Id',
    accessor: 'id',
    disableFilters: true,
    // alwaysShow: true,
  },
  {
    Header: 'Event custom info',
    columns: [
      {
        Header: 'Tab',
        accessor: 'eventTab',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Format',
        accessor: 'format',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Name and description',
        columns: [    
          {
            Header: 'Title',
            accessor: 'eventTitle',
            Cell: (props: any) => {
              return (
                <>
                  <p>В беке нету</p>
                </>
              )
            }
          },
          {
            Header: 'Body',
            accessor: 'eventBody',
            Cell: (props: any) => {
              return (
                <>
                  <p>В беке нету</p>
                </>
              )
            }
          }
        ]
      },
      {
        Header: 'Dates info',
        columns: [
          {
            Header: 'Event start',
            accessor: 'startDate'
          },
          {
            Header: 'Event finish',
            accessor: 'deadline'
          },
          {
            Header: 'Date end of acceptin',
            accessor: 'dateOfEndAccept'
          },
          {
            Header: 'Event duration',
            accessor: 'duration',
          }
        ]
      },
      {
        Header: 'Image info',
        columns: [
          {
            Header: 'Src',
            accessor: 'image',
            disableFilters: true,
            Cell: (props: any) => {              
              return (
                <>
                  <img src={`${props.cell.value.path}.${props.cell.value.ext}`} alt='' />
                </>
              )
            }
          },
          {
            Header: 'Alt text',
            accessor: 'image.altText',
            disableFilters: true
          },
        ]
      },
      {
        Header: 'Requirements',
        columns: [
          {
            Header: 'English level',
            accessor: 'englishLevel',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Technologies',
            accessor: 'technologies'
          }
        ]
      },
      {
        Header: 'Location',
        columns: [
          {
            Header: 'Country',
            accessor: 'country',
            Filter: SelectColumnFilter,
            filter: 'includes'
          },
          {
            Header: 'City',
            accessor: 'city'
          }
        ]
      },
      {
        Header: 'Info create',
        columns: [
          {
            Header: 'Who created event (userId)',
            accessor: 'creatorEvent',
            Cell: (props: any) => {
              const {cell} = props;
              return (
                <>
                  {`${cell.value.empFirstName} ${cell.value.empLastName} (${cell.value.role.name})` }
                </>
              )
            }
          },
          {
            Header: 'Event created at',
            accessor: 'creatorEvent.createdAt',
          },
        ]
      }
    ]
  },
];