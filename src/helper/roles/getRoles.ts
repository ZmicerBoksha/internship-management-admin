export enum ROLE {
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Admin'
}

export const isAdmin = () => {
  return JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').role === ROLE.ADMIN
}

export const isSuperAdmin = () => {
  return JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').role === ROLE.SUPER_ADMIN
}