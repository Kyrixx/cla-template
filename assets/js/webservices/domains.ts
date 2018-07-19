import axios, { AxiosPromise } from 'axios'


export function getDomains(): AxiosPromise {
    return axios.get('http://backend.wizbii.com/domains');
}