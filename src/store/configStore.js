import { configureStore } from '@reduxjs/toolkit'
import notes from './notesSlice'

export const store = configureStore({
  reducer: {
    notes
  },
})