import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    favoriteFilms: [],
    dataFavorite: {},
    viewedFilms: [],
    dataViewed: {},
    gradeFilms: [],
    grade: null,
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setFavoriteFilms: (state, action) => {
            state.favoriteFilms = action.payload;
        },
        setFavoriteFilmsData: (state, action) => {
            state.dataFavorite = action.payload;
        },
        setViewedFilms: (state, action) => {
            state.viewedFilms = action.payload;
        },
        setViewdFilmsData: (state, action) => {
            state.dataViewed = action.payload;
        },
        setGradeFilms: (state, action) => {
            state.gradeFilms = action.payload;
        },
        setGrade: (state, action) => {
            state.grade = action.payload;
        },
    },
});

const {actions, reducer} = userProfileSlice;

export default reducer;

export const {setFavoriteFilms, setFavoriteFilmsData, setViewedFilms, setViewdFilmsData, setGradeFilms, setGrade} = actions;