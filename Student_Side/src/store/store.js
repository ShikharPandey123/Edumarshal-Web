import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        isOpen: true,
    },
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

const dateSlice = createSlice({
    name: "date",
    initialState: {
        selectedDate: null,
    },
    reducers: {
        selectDate: (state, action) => {
            state.selectedDate = action.payload.timestamp;
        },
    },
});

const selectDateFromState = (state) => state.date.selectedDate;

export const { toggleMenu } = menuSlice.actions;
export const { selectDate } = dateSlice.actions;
export const memoizedSelectDate = createSelector(
    [selectDateFromState],
    (selectedDate) => new Date(selectedDate)
);

export default configureStore({
    reducer: {
        menu: menuSlice.reducer,
        date: dateSlice.reducer,
    },
});
