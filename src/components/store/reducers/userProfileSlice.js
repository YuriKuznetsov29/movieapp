import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    favoriteFilms: [],
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setFavoriteFilms: (state, action) => {
            state.favoriteFilms = action.payload;
        },
    },
});

const {actions, reducer} = userProfileSlice;

export default reducer;

export const {setFavoriteFilms} = actions;