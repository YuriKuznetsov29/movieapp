import { useState, useEffect } from 'react';
import { setFilmId } from '../store/reducers/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setViewedFilms, setViewdFilmsData} from '../store/reducers/userProfileSlice';
import { setMaxYear, setMinYear, setGenre, setCountry, setMaxRate, setMinRate, clearFilters } from '../store/reducers/filtersSlice';
import { getDatabase, ref, onValue} from "firebase/database";
import MovieService from '../../services/MovieService';

const ViewedFilms = () => {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    // const [maxRate, setMaxRate] = useState(10);
    // const [minRate, setMinRate] = useState(0);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [filtersState, setFiltersState] = useState({state: false, style: {'display': 'none'}});

    const {deleteViewedFilm} = MovieService();

    const dispatch = useDispatch();

    const userId = useSelector(state => state.login.userId);
    const viewedFilms = useSelector(state => state.userProfile.viewedFilms);
    const dataViewed = useSelector(state => state.userProfile.dataViewed);
    const gradeFilms = useSelector(state => state.userProfile.gradeFilms);
    const genres = useSelector(state => state.movieInfo.genres);
    const countries = useSelector(state => state.movieInfo.countries);

    
    const genre = useSelector(state => state.filters.genre);
    const country = useSelector(state => state.filters.country);
    const maxYear = useSelector(state => state.filters.maxYear);
    const minYear = useSelector(state => state.filters.minYear);
    const maxRate = useSelector(state => state.filters.maxRate);
    const minRate = useSelector(state => state.filters.minRate);

    useEffect(() => {
        readDataViewed()
    }, [userId])

    useEffect(() => {
        filterFilms(viewedFilms, genre, country, maxYear, minYear, maxRate, minRate)
    }, [viewedFilms, genre, country, maxYear, minYear, maxRate, minRate])

    const readDataViewed = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/viewedFilms/');
        onValue(Ref, (films) => {
        const dataViewed = films.val();
        dispatch(setViewdFilmsData(dataViewed));
        dispatch(setViewedFilms(Object.entries(dataViewed)));
    })}

    const showFilters = () => {
        if (filtersState.state) {
            setFiltersState({state: false, style: {'display': 'none'}});
        }
        else {
            setFiltersState({state: true, style: {'display': 'flex'}});
        }
    }

    const filterFilms = (arr, genre, country, maxYear, minYear, maxRate, minRate) => {
        console.log(arr)
        let filteredFilms = genre ? arr.filter(item => {
                return item[1].genre === genre
                }) : arr;

        filteredFilms = country ? filteredFilms.filter(item => {
            return item[1].country === country
            }) : filteredFilms;

        filteredFilms = maxYear ? filteredFilms.filter(item => {
            return item[1].year <= maxYear
            }) : filteredFilms;

        filteredFilms = minYear ? filteredFilms.filter(item => {
            return item[1].year >= minYear
            }) : filteredFilms;

        filteredFilms = filteredFilms.filter(item => {
            if (!item[1].ratingKinopoisk) return item
            return item[1].ratingKinopoisk <= maxRate
            });

        filteredFilms = filteredFilms.filter(item => {
            if (!item[1].ratingKinopoisk) return item
            return item[1].ratingKinopoisk >= minRate
            });

        console.log(filteredFilms)
        
        setFilteredFilms(filteredFilms)
    }

    const renderViewedFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='favorite-item-inner'>
                    <div 
                        className='favorite-poster'
                        onClick={() => {
                            dispatch(setFilmId(item[1].id))
                        }}>
                            <img src={item[1].poster} alt="logo"/>
                    </div>
                    <div className='favorite-info'>
                        <h4>{item[1].name}</h4>
                        <h4>{item[1].country}</h4>
                        <div>{item[1].year}</div>
                        <div>{item[1].genre}</div>
                        {item[1].time ? <div>{item[1].time + ' мин'}</div> : null}
                        {item[1].ratingKinopoisk ? <div>{`Рейтинг кинопоиска ${item[1].ratingKinopoisk}`}</div> : null}
                        {gradeFilms.map(el => {
                            if (item[1].id === el[1].id) {
                                return <div>Ваша оценка {el[1].grade}</div>
                            }
                        })}
                    </div>
                    <i class="ph-trash delete"
                        onClick={() => deleteViewedFilm(item[0])}></i>
                </div>
            )
        })

        const fimsQuantity = arr.length + ' фильмов';
        const hourseQuantity = Math.floor(arr.reduce((acc, curr) => (acc + (curr[1].time !== null ? curr[1].time : 0) / 60), 0)) + ' часов';
        const daysQuantity = (arr.reduce((acc, curr) => (acc + (curr[1].time !== null ? curr[1].time : 0) / 60 / 24), 0)).toFixed(1) + ' дней';
        return (
            <div className="results-favorite">
                <i class="ph-sliders showFilters" onClick={() => showFilters()}></i>
                <h1 className="result-title">Просмотренные фильмы</h1>
                <div className='statistic'>
                    <div className='statItem'>{fimsQuantity}</div>
                    <div className='statItem'>{hourseQuantity}</div>
                    <div className='statItem'>{daysQuantity}</div>

                </div>
                <div className="filters" style={filtersState.style}>
                    <span>
                        <input 
                            className="inputYear" 
                            placeholder="max год"
                            onChange={(e) => dispatch(setMaxYear(e.target.value))}>
                        </input>
                        <input 
                            className="inputYear" 
                            placeholder="min год"
                            onChange={(e) => dispatch(setMinYear(e.target.value))}>
                        </input>
                    </span>
                    <span>
                        <select className="inputSelect" onChange={(e) => dispatch(setCountry(e.target.value))}>
                            <option value={''} selected>Выберете страну</option>
                            {countries.map(item => <option value={item.country}>{item.country}</option>)}
                        </select>
                        <select className="inputSelect" onChange={(e) => dispatch(setGenre(e.target.value))}>
                            <option value={''} selected>Выберете жанр</option>
                            {genres.map(item => <option value={item.genre}>{item.genre}</option>)}
                        </select>
                    </span>
                    <span>
                        <label>{`Макс рейтинг ${maxRate}`}</label>
                        <input className='rangeRate' type='range' min='0' max='10' step='1' value={maxRate} onChange={(e) => dispatch(setMaxRate(e.target.value))}></input>
                        <label>{`Мин рейтинг ${minRate}`}</label>
                        <input className='rangeRate' type='range' min='0' max='10' step='1' value={minRate} onChange={(e) => dispatch(setMinRate(e.target.value))}></input>
                    </span>
                    <div className="clearFilters" onClick={() => dispatch(clearFilters())}>
                        <i class="ph-paint-brush-household"></i>
                    </div>
                </div>
                {items}
            </div>
        )
    }

    const content = renderViewedFilms(filteredFilms);

    return (
        <>
            <div className='favorite-content-wrapper'>
                {dataViewed ? content : null}
            </div>
        </>
    )
}

export default ViewedFilms;