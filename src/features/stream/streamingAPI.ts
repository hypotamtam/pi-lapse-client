import {StreamConfig} from "./streamConfig"
import axios from "axios"

const baseURL =  "http://192.168.1.19" // window.location.hostname

export function startStreamingAPI() {
  return axios.put<string>(baseURL + ":3000/start")
    .then(() => baseURL + ":3000/stream.mjpg")
}

export function stopStreamingAPI() {
  return axios.put<string>(baseURL + ":3000/stop")
              .then(value => value.data)
}

export function updateConfigAPI(config: StreamConfig) {
  return axios.post<void>(baseURL + ":3000/config", config)
              .then(value => value.data)
}