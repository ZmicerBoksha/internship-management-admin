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
  body: string;
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
  // withCredentials: true,
  // headers: {
  //   "content-type": "application/json"
  // },
});

export const eventsApi = {
  getEvents() {
    return instance.get(`/event/all`).then(response => {
      console.log(response);
      return response.data;
    });
  },
  getEventInfo(eventId: string) {
    return instance.get(`/event/${eventId}`).then(response => {
      console.log(response);
      return response.data;
    });
  },
  createEvent(formData: IEventForm) {
    console.log(formData);
    return instance
      .post(`/event`, {
        // "title": "string",
        // "body": "very big string",
        englishLevel: formData.englishLevel,
        technologies: formData.technologies,
        startDate: formData.startDate,
        deadline: formData.deadline,
        dateOfEndAccept: formData.dateOfEndAccept,
        duration: formData.duration,
        eventTab: formData.eventTab,
        format: formData.format,
        country: formData?.country,
        city: formData?.city,
        image: 1,
        creatorEvent: 1,
        employee: 1,
        eventType: 1,
      })
      .then(response => {
        console.log(response);
      });
  },
  updateEvent(eventId: string, formData: IEventForm) {
    console.log(formData);
    return instance
      .put(`/event/${eventId}`, {
        // "title": "string",
        // "body": "very big string",
        englishLevel: formData.englishLevel,
        technologies: formData.technologies,
        startDate: formData.startDate,
        deadline: formData.deadline,
        dateOfEndAccept: formData.dateOfEndAccept,
        duration: formData.duration,
        eventTab: formData.eventTab,
        format: formData.format,
        country: formData?.country,
        city: formData?.city,
        image: 1,
        creatorEvent: 1,
        employee: 1,
        eventType: 1,
      })
      .then(response => {
        console.log(response);
      });
  },
  deleteEvent(eventId: number) {
    return instance.delete(`/event/${eventId}`).then(response => {
      console.log(response);
    });
  },
};

const getAllCandidates = (params: PageParams) => {
  return instance.get('/candidate', { params });
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
