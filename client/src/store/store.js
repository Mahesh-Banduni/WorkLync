import { configureStore } from '@reduxjs/toolkit';
import candidatesReducer from './slices/candidatesSlice';

const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
});

export default store;
