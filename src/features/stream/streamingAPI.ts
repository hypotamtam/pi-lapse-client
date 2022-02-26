import {StreamConfig} from "./streamConfig"
import axios from "axios"

export function startStreamingAPI() {
  return axios.put<string>(process.env.REACT_APP_BASE_URL + "/start")
    .then(() => process.env.REACT_APP_BASE_URL + "/stream.mjpg")
}

export function stopStreamingAPI() {
  return axios.put<string>(process.env.REACT_APP_BASE_URL + "/stop")
              .then(value => value.data)
}

export function updateConfigAPI(config: StreamConfig) {
  return axios.post<void>(process.env.REACT_APP_BASE_URL + "/config", config)
              .then(value => value.data)
}

export function getConfigAPI() {
  return axios.get<StreamConfig>(process.env.REACT_APP_BASE_URL + "/config")
              .then(value => value.data)
}