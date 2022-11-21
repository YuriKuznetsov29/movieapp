import { configureStore } from "@reduxjs/toolkit";
import login from './reducers/loginSlice';
import movieInfo from './reducers/movieSlice';
import userProfile from './reducers/userProfileSlice'

const store = configureStore({
    reducer: {login, movieInfo, userProfile},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;