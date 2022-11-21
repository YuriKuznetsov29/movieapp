import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";



export const fetchLogin = createAsyncThunk(
    'autorization/login',
    async ({email, password}) => {
        const auth = getAuth();
        console.log(email)
        console.log(password)
        await signInWithEmailAndPassword(auth, email, password);
        return email;
               
});

export const fetchLogOut = createAsyncThunk(
    'autorization/logout',
    async () => {
        const auth = getAuth();
        await signOut(auth);
    }
)

const initialState = {
    loginStatus: false,
    email: '',
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeStatusOnOnline: (state, action) => {
            state.loginStatus = true;
            state.email = action.payload;
        },
        changeStatusOnOffline: (state) => {
            state.loginStatus = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, state => {state.loginStatus = 'loading'})
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loginStatus = true;
                state.email = action.payload;
            })
            .addCase(fetchLogin.rejected, state => {
                state.loginStatus = 'error';
            })
            .addCase(fetchLogOut.fulfilled, (state) => {
                state.loginStatus = false;
            })
            .addCase(fetchLogOut.rejected, state => {
                state.loginStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const {actions, reducer} = loginSlice;

export default reducer;

export const {changeStatusOnOnline, changeStatusOnOffline} = actions;
