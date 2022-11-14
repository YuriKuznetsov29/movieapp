import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth, onAuthStateChanged} from "firebase/auth";

import './userProfile.scss'

const UserProfile = (props) => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        autorizationStatus(auth)
    }, [])

    const auth = getAuth();

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              const email = user.email;
              console.log('send to db')
              readData(uid)
              console.log(films)
            } else {
              console.log('User is signed out');
            }
          });
    }

    const readData = (userId) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const data = films.val()
        setFilms(Object.values(data))
    })}

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <>
                    <div 
                        className='find-poster'
                        onClick={() => {
                            props.onFilmSelected(item.id);
                        }}>
                            <img src={item.poster} alt="logo"/>
                    </div>
                    <div className='find-info'>
                        <h4>{item.name}</h4>
                        <div>{item.year}</div>
                        <div>{item.genre}</div>
                    </div>
                </>
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