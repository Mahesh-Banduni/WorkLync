import { createSlice } from '@reduxjs/toolkit';

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidatesList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCandidates: (state, action) => {
      const candidateData = action.payload;
      console.log("Action",action.payload)
      console.log("length",candidateData.length)
        if (!Array.isArray(candidateData) || candidateData.length === 0) {
          state.candidatesList = []; // Clear previous orders if no new data
          return;
        }
      
        // Mapping multiple orders
        state.candidatesList = candidateData.map(candidate => ({
          candidateId: candidate.candidateId,
          name: candidate.name,
          resumeFileUrl: candidate.resumeFileUrl,
          email: candidate.email,
          phoneNumber: candidate.phoneNumber,
          position: candidate.position,
          applicationStatus: candidate.applicationStatus,
          yearsOfExperience: candidate.yearsOfExperience,
          userId: candidate.candidateId,
          createdAt: candidate.createdAt,
          // user: candidate.user.map(item => ({
          //   userId: item.productId._id,
          //   email: item.productId.productName,
          //   name: item.productId.salePrice,
          //   role: item.size,
          // }))
        }));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
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
