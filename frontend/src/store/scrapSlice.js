import { createSlice } from "@reduxjs/toolkit";

const scrapSlice = createSlice({
    name: "scrap",
    initialState: { scrapList: [] },
    reducers: {
        setScrapList: (state, action) => {
            state.scrapList = action.payload;
        },
        addScrap: (state, action) => {
            state.scrapList.push(action.payload);
        },
        removeScrap: (state, action) => {
            state.scrapList = state.scrapList.filter(id => id !== action.payload);
        }
    }
})

export const { setScrapList, addScrap, removeScrap } = scrapSlice.actions;
export default scrapSlice.reducer;