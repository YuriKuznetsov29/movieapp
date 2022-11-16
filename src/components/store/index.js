import { configureStore } from "@reduxjs/toolkit";
import login from '../loginForm/loginSlice';

const store = configureStore({
    reducer: {login},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;