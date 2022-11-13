import { useState, useEffect } from 'react';
import MovieService from '../../services/MovieService';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth, onAuthStateChanged} from "firebase/auth";

import './userProfile.scss'

const UserProfile = (props) => {
    const [film, setFilm] = useState({});
    let films = [];

    const {getFilmInfo} = MovieService();

    const idArr = [301, 1294123];
    //, 1294123, 299, 316

    const loadData = (idArr) => {
        
        idArr.map(id => {
            getFilmInfo(id)
                .then(res => (setFilm(res)));
            films.push(film)
        })
        
        
    }

    useEffect(() => {
        loadData(idArr)
    }, [])

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='item-inner '>
                    <div 
                        className='find-posterr'>
                            <img src={item.poster} alt="logo"/>
                    </div>
                    <div className='find-infoo'>
                        <h4>{item.name}</h4>
                        <div>{item.year}</div>
                        <div>{item.genre}</div>
                    </div>
                </div>
            )
        })
        console.log(items)
        return (
            <div className="resultss">
                {items}
            </div>

        )
    }

    let content = renderFilms(films);

    const auth = getAuth();

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const email = user.email;
              console.log('send to db')
              ViewArr(uid)
            //   writeUserData(uid, email, filmInfo)
            //   console.log(`${email} User is signed in`);
              // ...
            } else {
              // User is signed out
              // ...
              console.log('User is signed out');
              
            }
          });
    }
    
    const ViewArr = (userId) => {
        const db = getDatabase();
                const starCountRef = ref(db, 'users/' + userId.key);
                onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data)
                });
    }

    

    

    return (
        <div className='find-wrapperr'>
            <button
            onClick={() => autorizationStatus(auth)}>
                12312414111
            </button>
            <h1>Мои фильмы</h1>
            
            {content}

        </div>
    )
}

export default UserProfile;