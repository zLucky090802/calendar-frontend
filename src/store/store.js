import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice,  } from "./";
import { Calendar } from "react-big-calendar";


export const store = configureStore({
    reducer:{
        ui: uiSlice.reducer,
        Calendar: calendarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})