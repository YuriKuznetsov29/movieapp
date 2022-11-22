import { useEffect, useState } from 'react';
import MovieService from '../../services/MovieService';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import {ModalShow, ModalClose, setFilmId, setFilmInfo, setSimilarFilms, setTrailars, setStaff} from '../store/reducers/movieSlice';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';


import './movieInfo.scss';

const MovieInfo = (props) => {
    // const [modalState, setModalState] = useState('infowrapper');
    // const [filmInfo, setFilmInfo] = useState({});
    const [gradeState, setGradeState] = useState({state: false, visible: {'display': 'block'}});
    // const [similarFilms, setSimilarFilms] = useState([]);
    // const [trailers, setTrailers] = useState([]);
    // const [staff, setStaff] = useState({actors: [], directors: []});

    const loginStatus = useSelector(state => state.login.loginStatus);
    const modalState = useSelector(state => state.movieInfo.modalState);
    const filmInfo = useSelector(state => state.movieInfo.filmInfo);
    const similarFilms = useSelector(state => state.movieInfo.similarFilms);
    const trailers = useSelector(state => state.movieInfo.trailers);
    const staff = useSelector(state => state.movieInfo.staff);
    const filmId = useSelector(state => state.movieInfo.filmId);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const auth = getAuth();

    const {getFilmInfo, getSimilarFilms, getTrailer, getStaff} = MovieService();

    useEffect(() => {
        openModal()
    }, [filmId])

    const SimilarFilmsSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };
    const VideosSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: "ondemand",
    };

    const openModal = () => {
        if (filmId) {
            loadData();
            document.body.style.overflow = "hidden";
        }
    }
    // {ModalShow, ModalClose, setFilmId, setFilmInfo, setSimilarilms, setStaff}
    // const loadData = () => {
    //     getFilmInfo(props.filmId)
    //         .then(res => setFilmInfo(res))
    //     setModalState('infowrapper show');
        
    //     getSimilarFilms(props.filmId)
    //         .then(res => setSimilarFilms(res));
    //     getTrailer(props.filmId)
    //         .then(res => {
    //                 let arr = [];
    //                 for (let i = 0; i < res.items.length; i++) {
    //                     if (res.items[i].site === 'YOUTUBE') {
    //                         arr.push(res.items[i]);
    //                     } else continue;
    //                 }
    //                 setTrailers(arr)
    //             }
    //         )
    //         getStaff(props.filmId)
    //             .then(res => setStaff(res))
            
    // }

    const loadData = () => {
        dispatch(ModalShow())
        getFilmInfo(filmId)
            .then(res => dispatch(setFilmInfo(res)));
        getSimilarFilms(filmId)
            .then(res => dispatch(setSimilarFilms(res)));
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
            getStaff(filmId)
                .then(res => dispatch(setStaff(res)));
    }

    // const closeModal = (e) => {
    //     if (e.target.id === 'close') {
    //         setModalState('infowrapper');
    //         setFilmInfo({});
    //         setSimilarFilms([]);
    //         setTrailers([]);
    //         setStaff({actors: [], directors: []})
    //         props.setFilmId('');
    //         document.body.style.overflow = "auto";
    //     }
    // }

    const closeModal = (e) => {
        if (e.target.id === 'close') {
            dispatch(setFilmId(null));
            dispatch(ModalClose());
            dispatch(setFilmInfo({}));
            dispatch(setSimilarFilms([]));
            dispatch(setTrailars([]));
            dispatch(setStaff({actors: [], directors: []}));
            document.body.style.overflow = "auto";
        }
    }

    const onShowGrade = () => {
        setGradeState({state: true, visible: {'display': 'none'}});
    }
    
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
                    <img 
                        src={item.posterUrl} 
                        alt="poster"
                        onClick={() => {
                            dispatch(setFilmId(item.id));
                        }} 
                    />
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
            if (item.url.slice(0, 25) === 'https://www.youtube.com/v') {
                // console.log(item.url)
                // console.log(item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26)))
                return ( 
                    <iframe width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
            if (item.url.slice(0, 29) ==='https://www.youtube.com/watch') {
                // console.log(item.url)
                // console.log(item.url.slice(0, 27) + '/embed/' + item.url.slice(-(item.url.length - 32)))
                return ( 
                    <iframe width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 32))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
        })
        return (
            items.length > 1 ?
                <Slider {...VideosSettings}>
                    {items}
                </Slider> :
                <>
                    {items}
                </>
        )
    }

    const renderActors = (arr) => {
        const items = arr.map((item, i) => {
                if (i < 9) {
                    return (
                        <>
                            <div>{item.nameRu}</div>
                        </>
                    )
                }
            }
        )
        return (
            <div>
                <h3>{`В главных ролях ${staff.actors.length}`}</h3>
                {items}
            </div>
        )
    }
    
    const similarContent = renderFilms(similarFilms);
    const videosContent = renderTrailars(trailers);
    const actors = renderActors(staff.actors);

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
                            { trailers.length === 1 ?
                                <div className='trailer-inner'>
                                    {videosContent}
                                </div> : null
                            }
                            
                        </div>
                        <div className='info'>
                            <h1>
                                {filmInfo.name}
                            </h1>
                            <div className='favorites'>
                                <span>
                                <button 
                                    className='btn-favorites'
                                    onClick={() => loginStatus ? autorizationStatus(auth) : (navigate("/login"), closeModal())
                                    }>
                                        <i class="ph-bookmark-simple"></i> <span>Добавить<br/> в избранное</span>
                                </button>
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
                            {actors}                        
                        </div>
                </div>
                { (trailers.length > 1) ? 
                    <div className='slider-inner'>
                        <h2>{`Тизеры и Трейлеры ${trailers.length}`}</h2>
                            {videosContent}
                    </div> : null
                }
                    
                { similarFilms.length >= 5 ? 
                    <div className='slider-inner'>
                        <h2>{`Похожие фильмы ${similarFilms.length}`}</h2>
                            {similarContent}
                    </div> : null
                }
                
            </div>
        </>
    )
}

export default MovieInfo;