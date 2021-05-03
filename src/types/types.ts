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
  role: object;
  skype: string;
  timezone: string;
  type: string;
};
