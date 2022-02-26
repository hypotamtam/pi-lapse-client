import {startTimelapseAPI, TimelapseDTO} from "./timelapseAPI"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export interface TimelapseState {
  config?: TimelapseDTO
}

const initialState: TimelapseState = {
  config: undefined,
}

export const startTimelapse = createAsyncThunk(
  "timelapse/start",
  async (config: TimelapseDTO) => {
    await startTimelapseAPI(config)
    return config
  },
)

export const timelapseSlice = createSlice({
  name: "timelapse",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startTimelapse.rejected, state => { state.config = undefined })
      .addCase(startTimelapse.fulfilled, (state, action) => { state.config = action.payload })
  },
})

export default timelapseSlice.reducer