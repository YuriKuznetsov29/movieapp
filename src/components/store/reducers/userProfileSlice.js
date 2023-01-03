import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    favoriteFilms: [],
    dataFavorite: {},
    viewedFilms: [],
    dataViewed: {},
    gradeFilms: [],
    grade: null,
    maxYear: null,
    minYear: null,
    genre: null,
    country: null,
    maxRate: 10,
    minRate: 0,
    filtersVisibility: false,
    content: 'FavoriteFilms',
    msgModalState: {display: 'none'},
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
        setMaxYear: (state, action) => {
            state.maxYear = action.payload;
        },
        setMinYear: (state, action) => {
            state.minYear = action.payload;
        },
        setGenre: (state, action) => {
            state.genre = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setMaxRate: (state, action) => {
            state.maxRate = action.payload;
        },
        setMinRate: (state, action) => {
            state.minRate = action.payload;
        },
        setFiltersVisibility: (state) => {
            state.filtersVisibility = !state.filtersVisibility;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        clearFilters: (state) => {
            state.genre = null;
            state.country = null;
            state.maxYear = null;
            state.minYear = null;
            state.maxRate = 10;
            state.minRate = 0;
        },
        setMsgModalState: (state, action) => {
            state.msgModalState = action.payload;
        },
    },
});

const {actions, reducer} = userProfileSlice;

export default reducer;

export const favoriteSelector = createSelector(
    (state) => state.userProfile.favoriteFilms,
    (state) => state.userProfile.genre,
    (state) => state.userProfile.country,
    (state) => state.userProfile.maxYear,
    (state) => state.userProfile.minYear,
    (state) => state.userProfile.maxRate,
    (state) => state.userProfile.minRate,
    (arr, genre, country, maxYear, minYear, maxRate, minRate) => {
        let filteredFilms = genre ? arr.filter(item => {
                return item[1].genre === genre
                }) : arr;
    
        filteredFilms = country ? filteredFilms.filter(item => {
            return item[1].country === country
            }) : filteredFilms;
    
        filteredFilms = maxYear ? filteredFilms.filter(item => {
            return item[1].year <= maxYear
            }) : filteredFilms;
    
        filteredFilms = minYear ? filteredFilms.filter(item => {
            return item[1].year >= minYear
            }) : filteredFilms;
    
        filteredFilms = filteredFilms.filter(item => {
            if (!item[1].ratingKinopoisk) return item
            return item[1].ratingKinopoisk <= maxRate
            });
    
        filteredFilms = filteredFilms.filter(item => {
            if (!item[1].ratingKinopoisk) return item
            return item[1].ratingKinopoisk >= minRate
            });
        return filteredFilms;
    }
)

export const viewedSelector = createSelector(
    (state) => state.userProfile.viewedFilms,
    (state) => state.userProfile.genre,
    (state) => state.userProfile.country,
    (state) => state.userProfile.maxYear,
    (state) => state.userProfile.minYear,
    (state) => state.userProfile.maxRate,
    (state) => state.userProfile.minRate,
    (arr, genre, country, maxYear, minYear, maxRate, minRate) => {
        let filteredFilms = genre ? arr.filter(item => {
                return item[1].genre === genre
                }) : arr;
    
        filteredFilms = country ? filteredFilms.filter(item => {
            return item[1].country === country
            }) : filteredFilms;
    
        filteredFilms = maxYear ? filteredFilms.filter(item => {
            return item[1].year <= maxYear
            }) : filteredFilms;
    
        filteredFilms = minYear ? filteredFilms.filter(item => {
            return item[1].year >= minYear
            }) : filteredFilms;
    
        filteredFilms = filteredFilms.filter(item => {
            if (!item[1].ratingKinopoisk) return item
            return item[1].ratingKinopoisk <= maxRate
            });
    
        filteredFilms = filteredFilms.filter(item => {
            if (!item[1].ratingKinopoisk) return item
            return item[1].ratingKinopoisk >= minRate
            });
        return filteredFilms;
    }
)

export const {setFavoriteFilms, setFavoriteFilmsData, setViewedFilms, setViewdFilmsData, setGradeFilms, setGrade, setMaxYear, setMinYear, setGenre, setCountry, setMaxRate, setMinRate, clearFilters, setFiltersVisibility, setContent, setMsgModalState} = actions;