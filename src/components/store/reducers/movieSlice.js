import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    modalState: 'infowrapper',
    filmId: null,
    filmInfo: {},
    similarFilms: [],
    trailers: [],
    staff: {actors: [], directors: []}
}

const movieInfoSlice = createSlice({
    name: 'movieInfo',
    initialState,
    reducers: {
        ModalShow: (state) => {
            state.modalState = 'infowrapper show';
        },
        ModalClose: (state) => {
            state.modalState = 'infowrapper';
        },
        setFilmId: (state, action) => {
            state.filmId = action.payload;
        },
        setFilmInfo: (state, action) => {
            state.filmInfo = action.payload;
        },
        setSimilarFilms: (state, action) => {
            state.similarFilms = action.payload;
        },
        setTrailars: (state, action) => {
            state.trailers = action.payload;
        },
        setStaff: (state, action) => {
            state.staff = action.payload;
        },
    },
});

const {actions, reducer} = movieInfoSlice;

export default reducer;

export const {ModalShow, ModalClose, setFilmId, setFilmInfo, setSimilarFilms, setTrailars, setStaff} = actions;