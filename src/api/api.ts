import axios from 'axios';
import { TCandidate } from '../components/candidates/candidate_list/candidates_list';

type PageParams = {
  page: number;
  itemsPerPage: number;
};

type TStatusHistory = {
  candidateId: number;
  changeNote: string;
  employeeId: number;
  statusId: number;
};

export type TEventFormat = 'ONLINE' | 'OFFLINE';
export type TEnglishLevel =
  | 'ADVANCED'
  | 'BEGINNER'
  | 'ELEMENTARY'
  | 'INTERMEDIATE'
  | 'PRE_INTERMEDIATE'
  | 'PROFICIENCY'
  | 'UPPER_INTERMEDIATE';
export type TEventTab = 'ARCHIVE' | 'IN_PROGRESS' | 'PLANNED';

export type TBackendModelWithGoodText = {
  backName: TEventFormat | TEnglishLevel | TEventTab;
  showAs: string;
};

export const eventFormats: TBackendModelWithGoodText[] = [
  {
    backName: 'ONLINE',
    showAs: 'Online',
  },
  {
    backName: 'OFFLINE',
    showAs: 'Offline',
  },
];

export const englishLevels: TBackendModelWithGoodText[] = [
  {
    backName: 'BEGINNER',
    showAs: 'Beginner (A1)',
  },
  {
    backName: 'ELEMENTARY',
    showAs: 'Elementary (A2)',
  },
  {
    backName: 'PRE_INTERMEDIATE',
    showAs: 'Pre-Intermediate (A2/B1)',
  },
  {
    backName: 'INTERMEDIATE',
    showAs: 'Intermediate (B1)',
  },
  {
    backName: 'UPPER_INTERMEDIATE',
    showAs: 'Upper-Intermediate (B2)',
  },
  {
    backName: 'ADVANCED',
    showAs: 'Advanced (C1)',
  },
  {
    backName: 'PROFICIENCY',
    showAs: 'Proficiency (C2)',
  },
];

export const eventTabs: TBackendModelWithGoodText[] = [
  {
    backName: 'ARCHIVE',
    showAs: 'Archive',
  },
  {
    backName: 'IN_PROGRESS',
    showAs: 'In progress',
  },
  {
    backName: 'PLANNED',
    showAs: 'Planned',
  },
];

export interface IEventForm {
  id: number;
  eventTab: TEventTab;
  format: TEventFormat;
  title: string;
  description: string;
  country?: string;
  city?: string;
  englishLevel: TEnglishLevel;
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

const instance = axios.create({
  baseURL: 'http://localhost:8085/api',
});

export const eventsApi = {
  getEvents(searchParam?: string, page?: number, itemsPerPage?: number) {
    let urlForRequest = '/event/all';
    // if (searchParam) {
    //   urlForRequest += `?search=${searchParam}`;
    // }

    searchParam && (urlForRequest += `?search=${searchParam}`);
    page && (urlForRequest += `?page=${page}`);
    itemsPerPage && (urlForRequest += `?itemsPerPage=${itemsPerPage}`);

    return instance.get(urlForRequest).then(response => response.data);
  },
  getEventInfo(eventId: string) {
    return instance.get(`/event/${eventId}`).then(response => response.data);
  },
  createEvent(formData: IEventForm) {
    return instance
      .post(`/event`, {
        ...formData,
        image: 1,
        creatorEvent: -1,
        employee: -1,
        eventType: 1,
      })
      .then(response => response);
  },
  updateEvent(eventId: string, formData: IEventForm) {
    return instance
      .put(`/event/${eventId}`, {
        ...formData,
        image: 1,
        creatorEvent: 1,
        employee: 1,
        eventType: 1,
      })
      .then(response => response);
  },
  deleteEvent(eventId: number) {
    return instance.delete(`/event/${eventId}`).then(response => response);
  },
};

const getAllCandidates = (params: PageParams) => {
  return instance.get<TCandidate[]>('/candidate', { params });
};

const getCandidate = (id: number) => {
  return instance.get(`/candidate/${id}`);
};

const updateCandidate = (id: number, data: TCandidate) => {
  return instance.put(`/candidate/${id}`, data);
};

const removeCandidate = (id: number) => {
  return instance.delete(`/candidate/${id}`);
};

const getAllStatus = () => {
  return instance.get('/status/all');
};

const getStatusHistory = (id: number) => {
  return instance.get(`/status/history/${id}`);
};

const getStatusHistoryByCandidate = (candidateId: number) => {
  return instance.get(`status/history/all?search=candidate.id==${candidateId}`);
};

const createStatusHistory = (data: TStatusHistory) => {
  return instance.post('/status/history/', data);
};

export const candidateService = {
  getAllCandidates,
  getCandidate,
  updateCandidate,
  removeCandidate,
};

export const statusServer = {
  getAllStatus,
};

export const statusHistoryServer = {
  getStatusHistory,
  createStatusHistory,
  getStatusHistoryByCandidate,
};
