import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getDatabase, ref, update, set} from "firebase/database";



// export const fetchdeleteFavoriteFilm = createAsyncThunk(
//     'userProfile/deleteFavoriteFilm',
//     async ({key, data}) => {
//         const auth = getAuth();
//         await onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 const uid = user.uid;
//                 const db = getDatabase();
//                 let newData = Object.assign({}, data);
//                 delete newData[key];
//                 const updates = {};
//                 updates[`users/` + uid + `/favoriteFilms/`] = newData;
//                 if (newData !== {}) {
//                     update(ref(db), updates);
//                 } else {
//                     set(ref(db, `users/` + uid + `/favoriteFilms/`), null);
//                 }
//             } else {
//               console.log('User is signed out');
//             }
//         });
        
               
// });

// const deleteFavoriteFilm = (key) => {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             const uid = user.uid;
//             const db = getDatabase();
//             let newData = Object.assign({}, data);
//             delete newData[key];
//             const updates = {};
//             updates[`users/` + uid + `/favoriteFilms/`] = newData;
//             if (newData !== {}) {
//                 update(ref(db), updates);
//             } else {
//                 set(ref(db, `users/` + uid + `/favoriteFilms/`), null);
//             }
//         } else {
//           console.log('User is signed out');
//         }
//     });
// }






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

export const {setFavoriteFilms} = actions;