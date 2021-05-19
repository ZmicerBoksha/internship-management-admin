import axios from 'axios';
import { PREFIX } from '../../../constants';

const instance = axios.create({
  baseURL: PREFIX,
});

export const getSlots = (id: string) => {
  return instance.get(`employees/${id}/availability`).then(response => {
    return response.data.availableTimeSlots;
  });
};
