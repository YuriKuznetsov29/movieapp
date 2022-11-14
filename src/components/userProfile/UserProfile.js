import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove, set} from "firebase/database";
import { getAuth, onAuthStateChanged} from "firebase/auth";

import './userProfile.scss'

const UserProfile = (props) => {
    const [films, setFilms] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
        autorizationStatus(auth)
    }, [])

    const auth = getAuth();

    function writeNewPost(userId, key) {
        
      }

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              const email = user.email;
              console.log('send to db');
              readData(uid);
              console.log(films);
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
        setFilms(Object.entries(data));
    })}

    const deleteFavoriteFilm = (key) => {
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const db = getDatabase();
                let newData = Object.assign({}, data);
                delete newData[key];
                console.log(data)
                console.log(newData)
                const updates = {};
                updates[`users/` + uid + `/favoriteFilms/`] = newData;
                update(ref(db), updates)
                // setFilms([]);
                // console.log(films)
                // readData(uid);
                // renderFilms(films)
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
                            props.onFilmSelected(item[1].id);
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

    let content = renderFilms(films);
    
    return (
        <div className='find-wrapper'>
            
            <h1>Мои фильмы</h1>
            
            {content}

        </div>
    )
}

export default UserProfile;