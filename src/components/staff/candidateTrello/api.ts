import axios from "axios";
import { PREFIX } from "../../../constants";

const instance = axios.create({
  baseURL: PREFIX,
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