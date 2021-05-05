export type TCandidate = {
  institution: string;
  faculty: string;
  speciality: string;
  email: string;
  englishLevel: string;
  otherSkills: string;
  mainSkill: string;
  firstName: string;
  id: number;
  lastName: string;
  country: string;
  city: string;
  phone: string;
  rsmId: number;
  skype: string;
  graduationDate: Date;
  status: string;
};

export type TResume = {
  ext: string;
  id: number;
  link: string;
  name: string;
  path: string;
  size: number;
};

export type TFeedback = {
  feedback: string;
  idCandidate: number;
  idEmployee: number;
};

export type TEmployee = {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  locationCity: string;
  locationCountry: string;
  phone: string;
  primaryTechnology: string;
  role: TRole;
  skype: string;
  timezone: string;
  type: string;
};

export type TRole = {
  id: number;
  name: string;
  description: string;
  permissions: TPermission;
};

export type TPermission = {
  id: number;
  name: string;
};

export type TStatus = {
  description: string;
  id: number;
  name: string;
};

export type TStatusHistory = {
  id: number;
  status: TStatus;
  candidate: TCandidate;
  employee: TEmployee;
};

export type TInterviewTime = {
  beginDate: Date | null;
  cnId: number;
  empId: number;
  evId: number;
  id: number;
};

export interface IEventForm {
  id: number;
  eventTab: string;
  format: 'ONLINE' | 'OFFLINE';
  title: string;
  description: string;
  country?: string;
  city?: string;
  englishLevel: string;
  technologies: string;
  startDate: Date;
  deadline: Date;
  dateOfEndAccept: Date;
  duration: string;
  image: {
    altText?: string;
    imageData: any;
  };
}

export type TStatusHistoryPost = {
  candidateId: number;
  changeNote: string;
  employeeId: number;
  statusId: number;
};
