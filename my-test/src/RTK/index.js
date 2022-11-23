import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rtkSlice from './rtlSlice'

const rootReducer = combineReducers({toolkit: rtkSlice}) 

export const store = configureStore({reducer: rootReducer})