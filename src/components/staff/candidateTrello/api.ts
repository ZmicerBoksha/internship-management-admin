import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8085/api',
});

export const getCandidateIdByEmpolee=(id:number)=> {
  return instance.get(`interviewtime?search=empId==${id}`).then(response => {
    return response.data;
  });
}

export const getCandidateById=(candidateIds:any[])=> {
  return instance.get(`candidate?search=id=in=(${candidateIds.join()})`).then(response => {
    return response.data;
  });
}

export const getStatusCandidateById=(candidateIds:any[])=> {
  return instance.get(`status/history/all?search=candidate.id=in=(${candidateIds.join()})`).then(response => {
    return response.data;
  });
}