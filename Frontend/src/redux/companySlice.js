import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompanies: [],
    searchCompanyText: "",
    singleCompany: null,
  },
  reducers: {
    setCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyText = action.payload;
    },
    setSingleCompany: (state, action) => {
      // yeh naya reducer
      state.singleCompany = action.payload;
    },
  },
});

export const { setCompanies, setSearchCompanyByText, setSingleCompany } =
  companySlice.actions;
export default companySlice.reducer;
