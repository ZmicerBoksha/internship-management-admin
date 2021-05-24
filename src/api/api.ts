import { config } from 'node:process';
import axios from 'axios';
import { TCandidate, TInterviewTime, TResume, TStatusHistoryPost } from '../types/types';
import { ROLE } from '../helper/roles/getRoles';

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

export type TImageEvent = {
  data: File & { altText?: string };
  src?: string;
};

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
  imageId: number;
  image: TImageEvent;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

export interface IEmployeeRoles {
  id?: string | number;
  name?: string;
  lastName?: string;
  role?: ROLE;
}

export const getEmployeeInfoByEmail = (email: string) =>
  instance.get(`/employees?search=email==${email}`).then(response => {
    const allEmployeeInfo = response.data.content[0];
    const employeeInfo: IEmployeeRoles = {
      id: allEmployeeInfo.id,
      name: allEmployeeInfo.firstName,
      lastName: allEmployeeInfo.lastName,
      role: allEmployeeInfo.role.name,
    };

    return employeeInfo;
  });

export const imageApi = {
  getImageById(imageId: string | number) {
    return instance.get(`/image/${imageId}`).then(response => response.data);
  },
  createImage(eventId: string | number, imageData: File & { altText?: string }) {
    let formData = new FormData();
    formData.append('image', imageData);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log(imageData);
    console.log(formData);
    console.log(formData.get('image'));
    const config = {
      headers: {
        withCredentials: true,
        'content-type': 'multipart/form-data',
      },
    };
    return instance.post(`/image/upload?id=${eventId}`, formData, config).then(response => response);
  },
  updateImage(imageId: string | number, imageData: File) {
    let formData = new FormData();
    formData.append('image', imageData);

    const config = {
      headers: {
        withCredentials: true,
        'content-type': 'multipart/form-data',
      },
    };

    const newImageInfo = {
      altText: '',
      ext: imageData.type,
      name: imageData.name,
      size: imageData.size,
    };

    return instance.put(`/image/${imageId}`, formData, config).then(response => {
      return response;
    });
  },
};

export const filesApi = {
  getImageByName(name: string, imagePath: string) {
    name += name.match(/\.(jpg|jpeg|png|gif|ico|svg)$/) ? '' : `.${imagePath}`;

    return instance.get(`/file/image/${name}`).then(response => response);
  },
};

export const eventsApi = {
  getEvents(page: number, itemsPerPage: number, searchParam?: string) {
    let urlForRequest = '/event/all';
    arguments.length && (urlForRequest += '?');

    urlForRequest += `&page=${page}&itemsPerPage=${itemsPerPage}`;
    searchParam && (urlForRequest += `&search=${searchParam}`);

    return instance.get(urlForRequest).then(response => {
      const totalElements = response.data.totalElements;

      const arrayGetImagesInfo: TImageEvent[] = response.data.content.map((item: IEventForm) =>
        imageApi.getImageById(item.imageId).then(imageData => {
          return filesApi
            .getImageByName(imageData.name, imageData.ext)
            .then(fileData => {
              return {
                data: { ...imageData },
                src: `${fileData.config.baseURL}${fileData.config.url}`,
              };
            })
            .catch(error => {
              return {
                data: {},
                src: '',
              };
            });
        }),
      );

      return Promise.all(arrayGetImagesInfo)
        .then(responses => {
          const responseData: IEventForm[] = [...response.data.content];
          return responses.map((item, index) => {
            const { ...props } = responseData[index];
            return {
              ...props,
              image: { ...item },
            };
          });
        })
        .then(response => {
          return {
            eventsList: response,
            totalElements,
          };
        });
    });
  },
  getEventInfo(eventId: string) {
    return instance.get(`/event/${eventId}`).then(response => {
      const responseData: IEventForm = { ...response.data };

      return imageApi.getImageById(responseData.imageId).then(imageData => {
        return filesApi
          .getImageByName(imageData.name, imageData.ext)
          .then(fileData => {
            responseData.image = {
              data: { ...imageData },
              src: `${fileData.config.baseURL}${fileData.config.url}`,
            };
            return responseData;
          })
          .catch(error => {
            responseData.image = {
              data: { ...imageData },
              src: ``,
            };
            return responseData;
          });
      });
    });
  },
  createEvent(formData: IEventForm) {
    return instance
      .post(`/event`, {
        ...formData,
        imageId: 1,
        creatorEvent: JSON.parse(window.localStorage.getItem('employeeInfo') || '{}').id,
        eventType: 1,
        employee: 1,
      })
      .then(newEventData => {
        return imageApi.createImage(newEventData.data.id, formData.image.data).then(() => newEventData);
      });
  },
  updateEvent(eventId: string, formData: IEventForm) {
    return instance
      .put(`/event/${eventId}`, {
        ...formData,
        creatorEvent: 1,
        employee: 1,
        eventType: 1,
      })
      .then(updateEventData => {
        return imageApi.updateImage(updateEventData.data.imageId, formData.image.data).then(() => updateEventData);
      });
  },
  deleteEvent(eventId: number) {
    return instance.delete(`/event/${eventId}`).then(response => response);
  },
};

export const candidateEventsApi = {
  getAllCandidateEvent(page: number, itemsPerPage: number, searchParam?: string) {
    let urlForRequest = '/candidate-event/all';
    arguments.length && (urlForRequest += '?');

    urlForRequest += `page=${page}&itemsPerPage=${itemsPerPage}`;
    searchParam && (urlForRequest += `&search=${searchParam}`);

    return instance.get(urlForRequest).then(response => response);
  },
};

export const getCandidateIdByEmpolee = (id: number) => {
  return instance.get<TInterviewTime[]>(`interviewtime?search=empId==${id}`).then(({ data }) => data);
};

export const getCandidateById = (candidateIds: number[]) => {
  return instance.get<TCandidate[]>(`candidate?search=id=in=(${candidateIds.join()})`).then(({ data }) => data);
};

export const getStatusCandidateById = (candidateIds: number[]) => {
  return instance.get(`status/history/all?search=candidate.id=in=(${candidateIds.join()})`).then(({ data }) => data);
};

const getAllCandidates = (params: PageParams) => instance.get('/candidate', { params });

const getCandidate = (id: number) => instance.get<TCandidate>(`/candidate/${id}`);

const updateCandidate = (id: number, data: TCandidate) => instance.put(`/candidate/${id}`, data);

const removeCandidate = (id: number) => instance.delete(`/candidate/${id}`);

const getAllStatus = () => instance.get('/status/all');

const getStatusHistory = (id: number) => instance.get<TStatusHistory>(`/status/history/${id}`);

const createStatusHistory = (data: TStatusHistoryPost) => instance.post<TStatusHistoryPost>('/status/history/', data);

const getResume = (id: number) => instance.get<TResume>(`/resume/${id}`);

const getHrEmployees = () => instance.get(`/employees?search=type==HR`);

const getTsEmployees = (skill: string) => instance.get(`/employees?search=primaryTechnology==${skill}`);

const getStatusHistoryByCandidate = (candidateId: number) =>
  instance.get(`status/history/all?search=candidate.id==${candidateId}`);

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

export const resumeServer = {
  getResume,
};

export const employeeServer = {
  getHrEmployees,
  getTsEmployees,
};
