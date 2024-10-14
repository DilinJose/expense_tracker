import { configureStore } from '@reduxjs/toolkit'
import TrackerSlice from '../slice/trackerSlice'

export const store = configureStore({
    reducer: {
        tracker: TrackerSlice
    },
})