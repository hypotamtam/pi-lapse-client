import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {StreamConfig} from "./streamConfig"
import {getConfigAPI, startStreamingAPI, stopStreamingAPI, updateConfigAPI} from "./streamingAPI"

export interface StreamState {
  url?: string
  status: "stop" | "live"
  config: StreamConfig
}

const initialState: StreamState = {
  url: undefined,
  status: "stop",
  config: {},
}

export const startStreaming = createAsyncThunk("stream/start", async () => await startStreamingAPI(),)

export const stopStreaming = createAsyncThunk("stream/stop", async () => await stopStreamingAPI(),)

let timeout: ReturnType<typeof setTimeout> | null
export const updateStreamConfig = createAsyncThunk(
  "stream/updateConfig",
  async (config: StreamConfig) =>  {
    if (timeout) {
      clearTimeout(timeout)
    }
    return await new Promise<StreamConfig>(resolve => {
      timeout = setTimeout(async () => {
        await updateConfigAPI(config)
        timeout = null
        resolve(config)
      }, 2000)
    })
  },
)

export const getStreamConfig = createAsyncThunk("stream/getConfig", async () =>  await getConfigAPI())

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
      .addCase(updateStreamConfig.rejected, state => {
        state.status = "stop"
      })
      .addCase(updateStreamConfig.fulfilled, (state, action) => {
        state.status = "live"
        state.config = action.payload
      })
      .addCase(getStreamConfig.fulfilled, (state, action) => { state.config = action.payload })
  },
})

export default streamSlice.reducer