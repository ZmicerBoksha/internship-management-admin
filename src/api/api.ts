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

const instance = axios.create({
  baseURL: 'http://localhost:8085/api',
});

export const eventsApi = {
  getEvents(searchParam?: string) {
    let urlForRequest = '/event/all';
    if (searchParam) {
      urlForRequest += `?search=${searchParam}`;
    }

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
        creatorEvent: 1,
        employee: 1,
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
