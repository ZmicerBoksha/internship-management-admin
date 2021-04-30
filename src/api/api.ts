import axios from 'axios';

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
