import axios from "axios"

export interface TimelapseDTO {
  duration: number
  interval: number
  name: string
}

export function startTimelapseAPI(timelapse: TimelapseDTO) {
  return axios.put<void>(process.env.REACT_APP_BASE_URL + "/timelapse", timelapse)
}