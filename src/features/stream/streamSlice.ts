import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {StreamConfig} from "./streamConfig"
import {startStreamingAPI, stopStreamingAPI} from "./streamingAPI"

export interface StreamState {
  url?: string
  status: "stop" | "live"
  config: StreamConfig
}

const initialState: StreamState = {
  url: undefined,
  status: "stop",
  config: {
    exposure: "sport",
    timelapse: "100",
  },
}

export const startStreaming = createAsyncThunk(
  "stream/start",
  async () => await startStreamingAPI(),
)

export const stopStreaming = createAsyncThunk(
  "stream/stop",
  async () => await stopStreamingAPI(),
)

export const streamSlice = createSlice({
  name: "stream",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startStreaming.pending, (state) => {
        state.url = undefined
        state.status = "stop"
      })
      .addCase(startStreaming.fulfilled, (state, action) => {
        state.status = "live"
        state.url = action.payload
      })
      .addCase(stopStreaming.pending, state => {
        state.url = undefined
        state.status = "stop"
      })
  },
})

export default streamSlice.reducer