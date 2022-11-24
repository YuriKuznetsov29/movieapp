import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    favoriteFilms: [],
    data: {},
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setFavoriteFilms: (state, action) => {
            state.favoriteFilms = action.payload;
        },
        setFavoriteFilmsData: (state, action) => {
            state.data = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchdeleteFavoriteFilm.pending, state => {state.loginStatus = 'loading'})
    //         .addCase(fetchdeleteFavoriteFilm.fulfilled, (state, action) => {
    //             state.loginStatus = true;
    //             state.email = action.payload;
    //         })
    //         .addCase(fetchdeleteFavoriteFilm.rejected, state => {
    //             state.loginStatus = 'error';
    //         })
            
    // },
});

const {actions, reducer} = userProfileSlice;

export default reducer;

export const {setFavoriteFilms, setFavoriteFilmsData} = actions;