import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { setFilmId } from '../store/reducers/movieSlice';
import { setFavoriteFilms, setFavoriteFilmsData } from '../store/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import MovieService from '../../services/MovieService';

import './userProfile.scss'

const UserProfile = (props) => {
    // const [favoriteFilms, setFavoriteFilms] = useState([]);
    // const [data, setData] = useState([]);

    const {deleteFavoriteFilm} = MovieService();

    const userId = useSelector(state => state.login.userId);
    const favoriteFilms = useSelector(state => state.userProfile.favoriteFilms);
    const data = useSelector(state => state.userProfile.data);

    const dispatch = useDispatch();

    useEffect(() => {
        readData()
    }, [userId])

    const readData = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const data = films.val();
        dispatch(setFavoriteFilmsData(data));
        dispatch(setFavoriteFilms(Object.entries(data)));
    })}

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