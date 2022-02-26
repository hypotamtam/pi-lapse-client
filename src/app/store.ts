import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import streamReducer from '../features/stream/streamSlice'
import timelapseReducer from '../features/timelapse/timelapseSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stream: streamReducer,
    timelapse: timelapseReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;