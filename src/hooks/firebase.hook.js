import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDatabase, push, ref, set, onValue, update} from "firebase/database";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL, getMetadata} from "firebase/storage";
import { setFavoriteFilms, setViewdFilmsData, setViewedFilms, setFavoriteFilmsData } from "../components/store/reducers/userProfileSlice";
import { getLoginState } from "../components/store/selectors";
import { setAvatar } from "../components/store/reducers/userProfileSlice";

const useFirebase = () => {
    const {email} = useSelector(getLoginState);

    const userId = useSelector(state => state.login.userId);
    const dataFavorite = useSelector(state => state.userProfile.dataFavorite);
    const dataViewed = useSelector(state => state.userProfile.dataViewed);
    const storage = getStorage();
    const avatarRef = refStorage(storage, email + '/avatar')

    const dispatch = useDispatch();

    useEffect(() => {
        getAvatar()
    }, [avatarRef])

    const getAvatar = () => {
        console.log(storage);
        console.log(avatarRef);
        getMetadata(avatarRef)
            .then((metadata) => {
                console.log(metadata)
                if (metadata.size > 10) {
                    getDownloadURL(avatarRef)
                    .then((url) => {
                        dispatch(setAvatar(url))
                    })
                } else {
                    dispatch(setAvatar(null))
                }
        })
            
            
        
    }
    
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

    const readDataFavorite = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const dataFavorite = films.val();
        dispatch(setFavoriteFilmsData(dataFavorite));
        dispatch(setFavoriteFilms(Object.entries(dataFavorite)));
    })}

    const readViewedFilms = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/viewedFilms/');
        onValue(Ref, (films) => {
        const data = films.val();
        dispatch(setViewedFilms(Object.entries(data)));
    })}

    const readDataViewed = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/viewedFilms/');
        onValue(Ref, (films) => {
        const dataViewed = films.val();
        dispatch(setViewdFilmsData(dataViewed));
        dispatch(setViewedFilms(Object.entries(dataViewed)));
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

    return {getAvatar, addFavoriteFilm, addViewedFilm, readFavoriteFilms, readDataFavorite, readViewedFilms, readDataViewed, deleteFavoriteFilm, deleteViewedFilm}
}

export default useFirebase;