import axios, { AxiosPromise } from 'axios'
import { JobTrainingSetInterface, JobTrainingSetUnknownInterface } from '../index'

export function getJobs(): AxiosPromise {
    return axios.get('http://backend.wizbii.com/jobs');
}

export function putJob(dataJobTrainingSet: JobTrainingSetInterface): AxiosPromise {
    return axios.put('http://backend.wizbii.com/jobs', dataJobTrainingSet)
}

export function putJobUnknown(dataJobTrainingSetUnknown: JobTrainingSetUnknownInterface): AxiosPromise {
    return axios.put('http://backend.wizbii.com/jobs/unknown', dataJobTrainingSetUnknown)
}