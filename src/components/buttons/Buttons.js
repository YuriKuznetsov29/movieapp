import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserProfileState, getMovieInfoState, getLoginState} from '../store/selectors';
import { setMsgModalState, setNotification } from "../store/reducers/userProfileSlice";
import useFirebase from "../../hooks/firebase.hook";
import { useNavigate } from "react-router-dom";

const Buttons = () => {
    const [keyFavorite, setKeyFavorite] = useState(null);
    const [keyViewed, setKeyViewed] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {favoriteFilms, viewedFilms} = useSelector(getUserProfileState);
    const {filmInfo, filmId} = useSelector(getMovieInfoState);
    const {loginStatus} = useSelector(getLoginState);

    const {addFavoriteFilm, addViewedFilm, deleteFavoriteFilm, deleteViewedFilm} = useFirebase();

    useEffect(() => {
        setKeyFavorite(null)
        checkFavoriteFilms()
    }, [filmId, favoriteFilms])

    useEffect(() => {
        setKeyViewed(null)
        checkViewedFilms()
    }, [filmId, viewedFilms])

    const checkFavoriteFilms = () => {
        favoriteFilms.forEach(item => {
            if (item[1].id === filmId) {
                setKeyFavorite(item[0])
            } 
        })
    }

    const checkViewedFilms = () => {
        viewedFilms.forEach(item => {
            if (item[1].id === filmId) {
                setKeyViewed(item[0])
            } 
        })
    }
// реализовать исчезновение модального окна
    return (
        <div className='favorites'>
            <span>
                { keyViewed && loginStatus ?
                    <button className='btn-favorites'
                    onClick={() => {
                        deleteViewedFilm(keyViewed);
                        setKeyViewed(null);
                    }}>
                        <i class="ph-eye"></i> <span>Просмотрено</span>
                    </button> : 
                    <button 
                        className='btn-favorites'
                        onClick={() => loginStatus ? (addViewedFilm(filmInfo), dispatch(setNotification('addViewed'))) : dispatch(setMsgModalState({display: 'block'}))}> 
                        <i class="ph-eye"></i> <span>Не просмотрено</span>
                    </button>
                }
            </span>
            <span>
                { keyFavorite && loginStatus ? 
                    <button 
                        className='btn-favorites'
                        onClick={() => {
                            deleteFavoriteFilm(keyFavorite);
                            setKeyFavorite(null);
                            }}>
                            <i class="ph-trash"></i> <span>В избранном</span>
                    </button> :
                    <button 
                        className='btn-favorites'
                        onClick={() => loginStatus ? (addFavoriteFilm(filmInfo), dispatch(setNotification('addFavorite'))) : dispatch(setMsgModalState({display: 'block'}))}>
                            <i class="ph-bookmark-simple"></i> <span>Буду смотреть!</span>
                    </button> 
                }
            </span>
        </div>
    )
}

export default Buttons;