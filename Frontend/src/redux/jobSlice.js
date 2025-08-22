// src/redux/jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk for fetching jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const res = await fetch("http://localhost:5000/api/jobs/all");
  const data = await res.json();
  console.log(data.jobs); // ✅ debug
  return data.jobs;
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    adminJobs: [],
    singleJob: null,
    searchText: "",
    adminSearchText: "", // 👈 admin ke liye alag search
    filters: {},
    status: "idle",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.filters = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJobById: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setSearchAdminJobs: (state, action) => {
      // 👈 ye add kar
      state.adminSearchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setSearchText,
  setSearchFilters,
  setAllJobs,
  setSingleJobById,
  setAdminJobs,
  setSearchAdminJobs, // 👈 export bhi karna
} = jobSlice.actions;

export default jobSlice.reducer;
