import { useEffect, useState, memo, useMemo } from 'react';
import MovieService from '../../services/MovieService';
import { setGrade } from '../store/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import {ModalShow, ModalClose, setFilmId, setFilmInfo, setSimilarFilms, setTrailars, setStaff} from '../store/reducers/movieSlice';
import { useNavigate } from "react-router-dom";
import SimilarFilms from '../similarFilms/SimilarFilms';
import Trailers from '../trailers/Trailars';
import GradeFilms from '../grageFilms/GradeFilms';
import ActorsOfCurrentFilm from '../actorsOfCurrentFilm/ActorsOfCurrentFilm';
import { useHttp } from '../hooks/http.hook';
import Spinner from '../Spinner/Spinner';
import useFirebase from '../hooks/firebase.hook';

import './movieInfo.scss';

const MovieInfo = () => {
    const [similarFilms, setSimilarFilms] = useState([]);
    const [keyFavorite, setKeyFavorite] = useState(null);
    const [keyViewed, setKeyViewed] = useState(null);

    const loginStatus = useSelector(state => state.login.loginStatus);
    const userId = useSelector(state => state.login.userId);
    const modalState = useSelector(state => state.movieInfo.modalState);
    const filmInfo = useSelector(state => state.movieInfo.filmInfo);
    const trailers = useSelector(state => state.movieInfo.trailers);
    const staff = useSelector(state => state.movieInfo.staff);
    const filmId = useSelector(state => state.movieInfo.filmId);

    // const similarFilms = useSelector(state => state.movieInfo.similarFilms);

    const navigate = useNavigate();
 
    const dispatch = useDispatch();

    const loading = useHttp();

    const favoriteFilms = useSelector(state => state.userProfile.favoriteFilms);
    const viewedFilms = useSelector(state => state.userProfile.viewedFilms);

    const {getFilmInfo, getTrailer, getSimilarFilms, getStaff} = MovieService();

    const {addFavoriteFilm, addViewedFilm, readFavoriteFilms, readViewedFilms, deleteFavoriteFilm, deleteViewedFilm} = useFirebase();

    useEffect(() => {
        openModal()
    }, [filmId])

    useEffect(() => {
        setKeyFavorite(null)
        checkFavoriteFilms()
    }, [filmId, favoriteFilms])

    useEffect(() => {
        setKeyViewed(null)
        checkViewedFilms()
    }, [filmId, viewedFilms])

    const openModal = () => {
        if (filmId) {
            loadData();
            document.body.style.overflow = "hidden";
        }
    }

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

    const loadData = () => {
        dispatch(ModalShow())
        getFilmInfo(filmId)
            .then(res => dispatch(setFilmInfo(res)));
        // getSimilarFilms(filmId)
        //     .then(res => setSimilarFilms(res));
        getTrailer(filmId)
            .then(res => {
                    let arr = [];
                    for (let i = 0; i < res.items.length; i++) {
                        if (res.items[i].site === 'YOUTUBE') {
                            arr.push(res.items[i]);
                        } else continue;
                    }
                    dispatch(setTrailars(arr))
                }
            );
            // getStaff(filmId)
            //     .then(res => dispatch(setStaff(res)));
            readFavoriteFilms()
            readViewedFilms()
    }

    const closeModal = (e) => {
        if (e.target.id === 'close') {
            dispatch(setFilmId(null));
            dispatch(ModalClose());
            dispatch(setFilmInfo({}));
            dispatch(setSimilarFilms([]));
            dispatch(setTrailars([]));
            dispatch(setStaff({actors: [], directors: []}));
            setKeyFavorite(null);
            setKeyViewed(null);
            dispatch(setGrade(null));
            document.body.style.overflow = "auto";
        }
    }

    return (
        <>
            <div className={modalState} style={{'background': `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) ), url(${filmInfo.background})`}} id='close' onClick={(e) => closeModal(e)}>
                <i 
                    className="ph-x close"
                    id='close'
                    onClick={() => closeModal()}>
                </i>
                <div className='infocontainer'>
                        <div className='poster'>
                            <div className='posterwrapper'>
                                <img src={filmInfo.poster} alt='poster'></img>
                            </div>
                            {trailers.length === 1 ?
                                <div className='trailer-inner'>
                                    <Trailers />
                                </div> : null
                            }
                            
                        </div>
                        <div className='info'>
                            <h1>
                                {filmInfo.name}
                            </h1>
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
                                            onClick={() => loginStatus ? addViewedFilm(filmInfo) : (navigate("/login"), closeModal())}>
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
                                            onClick={() => loginStatus ? addFavoriteFilm(filmInfo) : (navigate("/login"), closeModal())}>
                                                <i class="ph-bookmark-simple"></i> <span>Буду смотреть!</span>
                                        </button> 
                                    }
                                </span>
                            </div>
                            <h3>О фильме</h3>
                            <div className='filminfo'>
                                <div className='filminfostring'>
                                    <div className='info-line'>Год производства</div>
                                    <div className='info-line-data'>{filmInfo.year}</div>
                                </div>
                                <div className='filminfostring'>
                                    <div className='info-line'>Страна</div>
                                    <div className='info-line-data'>{filmInfo.country}</div>
                                </div>
                                <div className='filminfostring'>
                                    <div className='info-line'>Жанр</div>
                                    <div className='info-line-data'>{filmInfo.genre}</div>
                                </div>
                                {filmInfo.slogan ? 
                                <div className='filminfostring'>
                                    <div className='info-line'>Слоган</div>
                                    <div className='info-line-data'>{filmInfo.slogan}</div>
                                </div> :
                                null}
                                <div className='filminfostring'>
                                    <div className='info-line'>Время</div>
                                    <div className='info-line-data'>{`${filmInfo.time} мин.`}</div>
                                </div>
                            </div>
                            <div className='filminfostring'>
                                <div className='info-line'>Описание</div>
                                <div className='info-line-data'>{filmInfo.description}</div>
                            </div>
                        </div>
                        <div className='raiting'>
                            <GradeFilms/>
                            {filmInfo.ratingKinopoisk ? `Рейтинг кинопоиска ${filmInfo.ratingKinopoisk}` : null}
                            <ActorsOfCurrentFilm />                      
                        </div>
                </div>
                {trailers.length > 1 ?
                    <div className='slider-inner'>
                        <h2>{`Тизеры и Трейлеры ${trailers.length}`}</h2>
                        <Trailers />
                    </div> : null
                }
                <SimilarFilms/>
            </div>
        </>
    )
}

export default MovieInfo;