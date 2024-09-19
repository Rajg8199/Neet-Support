import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const Past5YearSlice = createSlice({
  name: 'Past5Years',
  initialState,
  reducers: {
    setPast5YearData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPast5YearData } = Past5YearSlice.actions
export default Past5YearSlice.reducer;
