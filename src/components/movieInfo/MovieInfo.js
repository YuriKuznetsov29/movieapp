import { useEffect, useState } from 'react';
import MovieService from '../../services/MovieService';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';

import './movieInfo.scss';




const MovieInfo = (props) => {
    const [modalState, setModalState] = useState('infowrapper');
    const [filmInfo, setFilmInfo] = useState({});
    const [gradeState, setGradeState] = useState({state: false, visible: {'display': 'block'}});
    const [similarFilms, setSimilarFilms] = useState([]);
    const [trailers, setTrailers] = useState([]);

    const loginStatus = useSelector(state => state.login.loginStatus);

    const navigate = useNavigate();

    const {getFilmInfo, getSimilarFilms, getTrailer} = MovieService();

    useEffect(() => {
        openModal()

    }, [props.filmId])

    const SimilarFilmsSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: false,
        speed: 10000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    const VideosSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    const openModal = () => {
        if (props.filmId) {
            loadData();
            document.body.style.overflow = "hidden";
        }
    }

    const loadData = () => {
        getFilmInfo(props.filmId)
            .then(res => setFilmInfo(res))
        setModalState('infowrapper show');
        getSimilarFilms(props.filmId)
            .then(res => setSimilarFilms(res));
        getTrailer(props.filmId)
            .then(res => setTrailers(res.items));
    }

    const closeModal = (e) => {
        if (e.target.id === 'close') {
            setModalState('infowrapper');
            setFilmInfo({});
            setSimilarFilms([]);
            props.setFilmId('');
            document.body.style.overflow = "auto";
        }
    }

    const onShowGrade = () => {
        setGradeState({state: true, visible: {'display': 'none'}});
    }

    const auth = getAuth();

    
    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              const email = user.email;
              console.log('send to db')
              addData(uid, filmInfo)
            } else {
              console.log('User is signed out');
            }
          });
    }

    const addData = (userId, film) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + `/favoriteFilms/`);
        const favoriteFilms = push(Ref);
        set(favoriteFilms, {
            ...film
        });
    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <>
                    <img src={item.posterUrl} alt="poster" />
                </>
            )
        })
        return (
            <Slider {...SimilarFilmsSettings}>
                {items}
            </Slider>
        )
    }

    const renderTrailars = (arr) => {
        const items = arr.map(item => {
            if (item.site === 'YOUTUBE') {
                // console.log(item.url)
                // console.log(item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26)))
                return ( 
                    <iframe width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
        })
        return (
            <Slider {...VideosSettings}>
                {items}
            </Slider>
        )
    }
    
    

    const SimilarContent = renderFilms(similarFilms);
    const VideosContent = renderTrailars(trailers);

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
                            
                        </div>
                        <div className='info'>
                            <h1>
                                {filmInfo.name}
                            </h1>
                            <div className='favorites'>
                                <span>
                                <button 
                                    className='btn btn-favorites'
                                    onClick={() => loginStatus ? autorizationStatus(auth) : (navigate("/login"), closeModal())
                                    }>
                                        <i class="ph-bookmark-simple"></i> Добавить<br/> в избранное
                                </button>
                                </span>
                            </div>
                            <h3>О фильме</h3>
                            <div className='filminfo'>
                                <div className='filminfostring'>
                                    <div>Год производства</div>
                                    <div>{filmInfo.year}</div>
                                </div>
                                <div className='filminfostring'>
                                    <div>Страна</div>
                                    <div>{filmInfo.country}</div>
                                </div>
                                <div className='filminfostring'>
                                    <div>Жанр</div>
                                    <div>{filmInfo.genre}</div>
                                </div>
                                {filmInfo.slogan ? 
                                <div className='filminfostring'>
                                    <div>Слоган</div>
                                    <div>{filmInfo.slogan}</div>
                                </div> :
                                null}
                                <div className='filminfostring'>
                                    <div>Время</div>
                                    <div>{`${filmInfo.time} мин.`}</div>
                                </div>
                            </div>
                            <div className='filminfostring'>
                                    <div>Описание</div>
                                    <div>{filmInfo.description}</div>
                                </div>
                        </div>
                        <div className='raiting'>
                            <button className='btn' style={gradeState.visible}
                            onClick={() => onShowGrade()}>Оценить</button>
                            
                            {gradeState.state ? <div className='choise'>
                                <div className='choisewrapper'>
                                    <div>
                                        <i className="ph-star star"></i>
                                    </div>
                                    <div>
                                        <span className='red'>1</span>
                                    </div>
                                    <div>
                                        <span className='red'>2</span>
                                    </div>
                                    <div>
                                        <span className='red'>3</span>
                                    </div>
                                    <div>
                                        <span className='red'>4</span>
                                    </div>
                                    <div>
                                        <span className='gray'>5</span>
                                    </div>
                                    <div>
                                        <span className='gray'>6</span>
                                    </div>
                                    <div>
                                        <span className='green'>7</span>
                                    </div>
                                    <div>
                                        <span className='green'>8</span>
                                    </div>
                                    <div>
                                        <span className='green'>9</span>
                                    </div>
                                    <div>
                                        <span className='green'>10</span>
                                    </div>
                                </div>
                            </div>: null}                        
                        </div>
                    
                </div>
                <div className='slider-inner'>
                        <h2>Тизеры и Трейлеры</h2>
                        {VideosContent}
                    </div>

                    
                {similarFilms.length >= 5 ? 
                    <div className='slider-inner'>
                        <h2>Похожие фильмы</h2>
                            {SimilarContent}
                    </div> : null
                }
                
            </div>
        </>
    )
}

export default MovieInfo;