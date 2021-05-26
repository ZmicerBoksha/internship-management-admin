export enum ROLE {
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin',
  EMPLOYEE = 'Employee',
}

export const isRoleExist = () => {
  return Boolean(JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').role);
};

export const isAdmin = () => {
  return JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').role === ROLE.ADMIN;
};

export const isSuperAdmin = () => {
  return JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').role === ROLE.SUPER_ADMIN;
};

export const isEmployee = () => {
  return JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').role === ROLE.EMPLOYEE;
};
