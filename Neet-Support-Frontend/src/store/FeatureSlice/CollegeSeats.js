import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

export const CollegeSeatSlice = createSlice({
    name: 'CollegeSeat',
    initialState,
    reducers: {
        CollegeSeat: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { CollegeSeat } = CollegeSeatSlice.actions
export default CollegeSeatSlice.reducer;
