import axios from "axios";

export interface IEventForm {
  id?: number,
  eventTab: string,
  format: 'ONLINE ' | 'OFFLINE',
  title: string,
  body: string,
  location?: {
    country: string,
    city: string
  },
  englishLevel: string,
  technologies: string,
  startDate: Date,
  finishDate: Date,
  dateEndOfAsseptin: Date,
  duration: string
  imageInfo: {
    altText: string,
    imageData: any,
  }
}

const instance = axios.create({
  baseURL: "http://localhost:8085/api",
  // withCredentials: true,
  // headers: {
  //   "content-type": "application/json" 
  // },
});

export const eventsApi = {
  getEvents() {
    return (
      instance.get(
        `/event/all`
      ).then(response => {   
        console.log(response)
        return response.data
      })
    )
  },
  getEventInfo(eventId: string) {
    return (
      instance.get(
        `/event/${eventId}`
      ).then(response => {
        console.log(response);
        return response.data        
      })
    )
  },
  createEvent(formData: IEventForm) {
    console.log(formData);
    return (
      instance.post(
        `/event`,
        {
          // "title": "string",
          // "body": "very big string",
          "englishLevel": formData.englishLevel,
          "technologies": formData.technologies,
          "startDate": formData.startDate,
          "deadline": formData.finishDate,
          "dateOfEndAccept": formData.dateEndOfAsseptin,
          "duration": formData.duration,
          "eventTab": formData.eventTab,
          "format": formData.format,
          "country": formData.location?.country,
          "city": formData.location?.city,
          "image": 1,
          "creatorEvent": 1,
          "employee": 1,
          "eventType": 1,
        }
      ).then(response => {
        console.log(response);        
      })
    )
  },
  updateEvent(eventId: string, formData: IEventForm){
    console.log(formData);
    return (
      instance.put(
        `/event/${eventId}`,
        {
          // "title": "string",
          // "body": "very big string",
          "englishLevel": formData.englishLevel,
          "technologies": formData.technologies,
          "startDate": formData.startDate,
          "deadline": formData.finishDate,
          "dateOfEndAccept": formData.dateEndOfAsseptin,
          "duration": formData.duration,
          "eventTab": formData.eventTab,
          "format": formData.format,
          "country": formData.location?.country,
          "city": formData.location?.city,
          "image": 1,
          "creatorEvent": 1,
          "employee": 1,
          "eventType": 1,
        }
      ).then(response => {
        console.log(response);        
      })
    )
  },
  deleteEvent(eventId: number){
    return (
      instance.delete(
        `/event/${eventId}`
      )
    ).then(response => {
      console.log(response);        
    })
  }
}
