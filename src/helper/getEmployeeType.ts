export const getEmployeeType = () => JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').type;
