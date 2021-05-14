import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8085/api',
});

export const getEmployeeById=(id:number)=> {
  return instance.get(`employees/${id}`).then(response => {
    return response.data;
  });
}
