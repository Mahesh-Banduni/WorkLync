import { createSlice } from '@reduxjs/toolkit';

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidatesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCandidates: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = false;
      state.candidatesList = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCandidates,
  setLoading,
  setError,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
