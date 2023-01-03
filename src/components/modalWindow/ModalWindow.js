import { useEffect, useState, memo, useMemo } from 'react';
import MovieService from '../../services/MovieService';
import { setGrade } from '../store/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import {ModalShow, ModalClose, setFilmId, setFilmInfo, setSimilarFilms, setTrailars, setStaff} from '../store/reducers/movieSlice';
import { getLoginState, getMovieInfoState, getUserProfileState } from '../store/selectors';
import { useNavigate } from "react-router-dom";
import SimilarFilms from '../similarFilms/SimilarFilms';
import MovieInfo from '../movieInfo/MovieInfo';
import Trailers from '../trailers/Trailars';
import GradeFilms from '../grageFilms/GradeFilms';
import ActorsOfCurrentFilm from '../actorsOfCurrentFilm/ActorsOfCurrentFilm';
import Buttons from '../buttons/Buttons';
import Msg from '../Msg/Msg';
import Spinner from '../Spinner/Spinner';
import useFirebase from "../../hooks/firebase.hook";

import './modalWindow.scss';

const ModalWindow = () => {
    const {loginStatus, userId} = useSelector(getLoginState);
    const {modalState, filmInfo, trailers, staff, filmId} = useSelector(getMovieInfoState);

    const dispatch = useDispatch();

    const {getFilmInfo, getTrailer, getSimilarFilms, getStaff, loading} = MovieService();

    const {readFavoriteFilms, readViewedFilms} = useFirebase();

    useEffect(() => {
        openModal()
    }, [filmId])

    const openModal = () => {
        if (filmId) {
            loadData();
            document.body.style.overflow = "hidden";
        }
    }

    const loadData = () => {
        dispatch(ModalShow())
        getFilmInfo(filmId)
            .then(res => dispatch(setFilmInfo(res)));
        // getSimilarFilms(filmId)
        //     .then(res => setSimilarFilms(res));
        getTrailer(filmId)
            .then(res => dispatch(setTrailars(res)));
        // getStaff(filmId)
        //     .then(res => dispatch(setStaff(res)));
        readFavoriteFilms()
        readViewedFilms()
    }

    const closeModal = (e) => {
        if (e.target.id === 'close') {
            dispatch(ModalClose());
            dispatch(setGrade(null));
            document.body.style.overflow = "auto";
        }
    }

    const onKeyDownClose = (e) => {
        console.log("esc")
        console.log(e.key)
        if (e.key === "Escape" || e.key === "Enter") closeModal(e);
    }

    const background = {'background': `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) ), url(${filmInfo.background})`};

    return (
        <div className={modalState} style={background} id='close' onClick={(e) => closeModal(e)}>
            <i 
                className="ph-x close"
                id='close'
                onClick={() => closeModal()}
                onKeyDown={(e) => onKeyDownClose(e)} tabIndex={1}
                >
            </i>
            <Msg/>
            <MovieInfo 
                buttons={<Buttons/>}
                grade={<GradeFilms/>}
                actors={<ActorsOfCurrentFilm />}
                trailer={trailers.length === 1 ? <Trailers /> : null }
            />
            {trailers.length > 1 ? <Trailers /> : null}
            <SimilarFilms/>
        </div>
    )
}

export default ModalWindow;