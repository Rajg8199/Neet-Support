import { configureStore } from '@reduxjs/toolkit'
import { Past5YearSlice } from './FeatureSlice/past5yearapi';
import { CollegeSeatSlice } from './FeatureSlice/CollegeSeats';

export const globalStore = configureStore({
  reducer: {
    past5Years: Past5YearSlice.reducer,
    CollegeSea: CollegeSeatSlice.reducer
  },
});
