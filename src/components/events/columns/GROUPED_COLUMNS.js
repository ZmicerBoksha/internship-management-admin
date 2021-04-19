import { SelectColumnFilter } from "../../common/Table/filters/SelectColumnFilter";

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Event custom info",
    columns: [
      {
        Header: "Tab",
        accessor: "eventTab",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Format",
        accessor: "format",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
    ],
  },
  {
    Header: "Name and description",
    columns: [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Body",
        accessor: "body",
      },
    ],
  },
  {
    Header: "Dates info",
    columns: [
      {
        Header: "Event start",
        accessor: "dateInfo.eventStart",
      },
      {
        Header: "Event finish",
        accessor: "dateInfo.eventFinish",
      },
      {
        Header: "Date end of acceptin",
        accessor: "dateInfo.datefEndAcceptin",
      },
      {
        Header: "Event duration",
        accessor: "dateInfo.duration",
      },
    ],
  },
  {
    Header: "Image info",
    columns: [
      {
        Header: "Src",
        accessor: "imagenfo.src",
        disableFilters: true,
        Cell: (props) => {
          return (
            <>
              <img src={props.cell.value} />
            </>
          );
        },
      },
      {
        Header: "Alt text",
        accessor: "imagenfo.alt",
        disableFilters: true,
      },
    ],
  },
  {
    Header: "Requirements",
    columns: [
      {
        Header: "English level",
        accessor: "requirements.englishLevel",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Technologies",
        accessor: "requirements.technologies",
      },
    ],
  },
  {
    Header: "Location",
    columns: [
      {
        Header: "Country",
        accessor: "location.county",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "City",
        accessor: "location.city",
      },
    ],
  },
  {
    Header: "Info create",
    columns: [
      {
        Header: "Who created event (userId)",
        accessor: "userCreatedId",
      },
      {
        Header: "Event published at",
        accessor: "publishedAt",
      },
    ],
  },
];
