import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, set} from "firebase/database";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { setFilmId } from '../store/reducers/movieSlice';
import { setFavoriteFilms } from '../store/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

import './userProfile.scss'

const UserProfile = (props) => {
    // const [favoriteFilms, setFavoriteFilms] = useState([]);
    const [data, setData] = useState([]);

    const favoriteFilms = useSelector(state => state.userProfile.favoriteFilms);

    const dispatch = useDispatch();

    useEffect(() => {
        autorizationStatus(auth)
    }, [])

    const auth = getAuth();

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              const email = user.email;
              console.log('send to db');
              readData(uid);
              console.log(favoriteFilms);
            } else {
              console.log('User is signed out');
            }
          });
    }

    const readData = (userId) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const data = films.val();
        setData(data);
        dispatch(setFavoriteFilms(Object.entries(data)));
    })}

    const deleteFavoriteFilm = (key) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const db = getDatabase();
                let newData = Object.assign({}, data);
                delete newData[key];
                const updates = {};
                updates[`users/` + uid + `/favoriteFilms/`] = newData;
                if (newData !== {}) {
                    update(ref(db), updates);
                } else {
                    set(ref(db, `users/` + uid + `/favoriteFilms/`), null);
                }
            } else {
              console.log('User is signed out');
            }
        });
    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='item-inner'>
                    <div 
                        className='find-poster'
                        onClick={() => {
                            dispatch(setFilmId(item[1].id))
                        }}>
                            <img src={item[1].poster} alt="logo"/>
                    </div>
                    <div className='find-info'>
                        <h4>{item[1].name}</h4>
                        <div>{item[1].year}</div>
                        <div>{item[1].genre}</div>
                        
                    </div>
                    <i class="ph-trash delete"
                        onClick={() => deleteFavoriteFilm(item[0])}></i>
                </div>
            )
        })
        return (
            <div className="results">
                {items}
            </div>

        )
    }

    let content = renderFilms(favoriteFilms);
    
    return (
        <div className='find-wrapper'>
            <h1>Избранные фильмы</h1>
            {data ? content : null}
        </div>
    )
}

export default UserProfile;