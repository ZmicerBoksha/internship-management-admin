import { config } from 'node:process';
import axios from 'axios';
import { TCandidate, TInterviewTime, TResume, TStatusHistoryPost } from '../types/types';

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
  data: File,
  src?: string,
}

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
  image: TImageEvent
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

export const imageApi = {
  getImageById(imageId: string | number) {
    return instance.get(`/image/${imageId}`).then(response => response.data);
  },
  createImage(eventId: string | number, imageData: File) {
    let formData = new FormData();
    formData.append('image', imageData);
    
    const config = {
      headers: {
        withCredentials: true,
        'content-type': 'multipart/form-data'
      }
    }
    console.log(imageData)
    return instance.post(`/image/upload?id=${eventId}`, formData, config).then(response => {
      console.log(response)
      return response
    });
  },
  updateImage(imageId: string | number, imageData: File) {
    let formData = new FormData();
    formData.append('image', imageData);    
    
    const config = {
      headers: {
        withCredentials: true,
        'content-type': 'multipart/form-data'
      }
    }

    return instance.put(`/image/${imageId}`, formData, config).then(response => {
      console.log(response)
      return response
    });
  },
};

export const filesApi = {
  getImageByName(imageName: string, imagePath: string) {
    imageName += imageName.match(/\.(jpg|jpeg|png|gif|ico|svg)$/) ? '' : `.${imagePath}`;

    return instance.get(`/file/image/${imageName}`)
    .then(response => response)
  }
}

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

          return filesApi.getImageByName(imageData.imageName, imageData.ext).then(fileData => {
            return {
              data: {...imageData},
              src: `${fileData.config.baseURL}${fileData.config.url}`
            }
          })
          .catch(error => {
            return {
              data: {},
              src: ''
            }
          })
        })
      );

      return Promise.all(arrayGetImagesInfo)
        .then(responses => {
          const responseData: IEventForm[] = [...response.data.content];
          return responses.map((item, index) => {
            const { ...props } = responseData[index];
            return {
              ...props,
              image: {...item}
            };
          });
        })
        .then(response => {
          return {
            eventsList: response,
            totalElements
          }
        })
    })
  },
  getEventInfo(eventId: string) {
    return instance.get(`/event/${eventId}`).then(response => {
      const responseData: IEventForm = {...response.data};
      
      return imageApi.getImageById(responseData.imageId).then(imageData => {
        console.log(imageData);
        return filesApi.getImageByName(imageData.imageName, imageData.ext).then(fileData => {
          responseData.image = {
            data: {...imageData},
            src: `${fileData.config.baseURL}${fileData.config.url}`
          }
          return responseData
        })
        .catch(error => {
          responseData.image = {
            data: {...imageData},
            src: ``
          }
          return responseData
        })
      })
    });
  },
  createEvent(formData: IEventForm) {
    return instance
      .post(`/event`, {
        ...formData,
        imageId: 1,
        creatorEvent: 1,
        employee: 1,
        eventType: 1,
      })
      .then(response => {
        imageApi.createImage(/*response.data.id*/ 25, formData.image.data);

        return response;
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
      // .then(response => {
      //   imageApi.updateImage(response.data.imageId, formData.image.data);

      //   return response
      // });
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
