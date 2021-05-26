export const getEmployeeId = () => JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').id;
