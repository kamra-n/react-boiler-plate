import { configureStore } from '@reduxjs/toolkit'
import twitterReducer from './TwitterSlice'

export const store = configureStore({
  reducer: twitterReducer,
})