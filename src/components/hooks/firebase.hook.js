import { useDispatch, useSelector } from "react-redux";
import {getDatabase, push, ref, set, onValue, update} from "firebase/database";
import { setFavoriteFilms, setViewedFilms } from "../store/reducers/userProfileSlice";

const useFirebase = () => {
    const userId = useSelector(state => state.login.userId);
    const dataFavorite = useSelector(state => state.userProfile.dataFavorite);
    const dataViewed = useSelector(state => state.userProfile.dataViewed);

    const dispatch = useDispatch();
    
    const addFavoriteFilm = (film) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + `/favoriteFilms/`);
        const favoriteFilms = push(Ref);
        set(favoriteFilms, {
            ...film
        });
    }

    const addViewedFilm = (film) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + `/viewedFilms/`);
        const vievedFilms = push(Ref);
        set(vievedFilms, {
            ...film
        });
    }

    const readFavoriteFilms = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const data = films.val();
        dispatch(setFavoriteFilms(Object.entries(data)));
    })}

    const readViewedFilms = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/viewedFilms/');
        onValue(Ref, (films) => {
        const data = films.val();
        dispatch(setViewedFilms(Object.entries(data)));
    })}

    const deleteFavoriteFilm = (key) => {
        const db = getDatabase();
        let newData = Object.assign({}, dataFavorite);
        delete newData[key];
        const updates = {};
        updates[`users/` + userId + `/favoriteFilms/`] = newData;
        if (newData !== {}) {
            update(ref(db), updates);
        } else {
            set(ref(db, `users/` + userId + `/favoriteFilms/`), null);
        }
    }

    const deleteViewedFilm = (key) => {
        const db = getDatabase();
        let newData = Object.assign({}, dataViewed);
        delete newData[key];
        const updates = {};
        updates[`users/` + userId + `/viewedFilms/`] = newData;
        if (newData !== {}) {
            update(ref(db), updates);
        } else {
            set(ref(db, `users/` + userId + `/viewedFilms/`), null);
        }
    }

    return {addFavoriteFilm, addViewedFilm, readFavoriteFilms, readViewedFilms, deleteFavoriteFilm, deleteViewedFilm}
}

export default useFirebase;