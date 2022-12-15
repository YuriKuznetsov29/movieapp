import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";



export const fetchLogin = createAsyncThunk(
    'autorization/login',
    async ({email, password}) => {
        const auth = getAuth();
        let userId = '';
        await signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    userId = res.user.uid
                    console.log(res.user)
                })
        return {email, userId};
               
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
    userId: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeStatusOnOnline: (state, action) => {
            state.loginStatus = true;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
        changeStatusOnOffline: (state) => {
            state.loginStatus = false;
            state.email = '';
            state.userId = null;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, state => {state.loginStatus = 'loading'})
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loginStatus = true;
                state.email = action.payload.email;
                state.userId = action.payload.userId;
            })
            .addCase(fetchLogin.rejected, state => {
                state.loginStatus = 'error';
            })
            .addCase(fetchLogOut.fulfilled, (state) => {
                state.loginStatus = false;
                state.email = '';
                state.userId = null;
            })
            .addCase(fetchLogOut.rejected, state => {
                state.loginStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const {actions, reducer} = loginSlice;

export default reducer;

export const {changeStatusOnOnline, changeStatusOnOffline, setUserId} = actions;
