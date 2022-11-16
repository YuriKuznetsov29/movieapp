import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";



export const fetchLogin = createAsyncThunk(
    'login/loging',
    async ({email, password}) => {
        const auth = getAuth();
        console.log(email)
        console.log(password)
        return await signInWithEmailAndPassword(auth, email, password)
               
}
);

const initialState = {
    loginStatus: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, state => {state.loginStatus = 'loading'})
            .addCase(fetchLogin.fulfilled, (state) => {
                state.loginStatus = true;
            })
            .addCase(fetchLogin.rejected, state => {
                state.loginStatus = 'error';
            })
            .addDefaultCase(() => {})
    },
});

const {actions, reducer} = loginSlice;

export default reducer;