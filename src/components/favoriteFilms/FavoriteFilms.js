import { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginState, getMovieInfoState,  } from "../store/selectors";
import { setFilmId } from '../store/reducers/movieSlice';
import MovieService from "../../services/MovieService";
import useFirebase from "../hooks/firebase.hook";
import Spinner from "../Spinner/Spinner";

const FavoriteFilms = () => {
    const [genre, setGenre] = useState(null);
    const [country, setCountry] = useState(null);
    const [maxYear, setMaxYear] = useState(null);
    const [minYear, setMinYear] = useState(null);
    const [maxRate, setMaxRate] = useState(10);
    const [minRate, setMinRate] = useState(0);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [filtersState, setFiltersState] = useState({state: false, style: {'display': 'none'}});

    const {loading} = MovieService();
    const {deleteFavoriteFilm, readDataFavorite} = useFirebase();

    const dispatch = useDispatch();

    const userId = useSelector(state => state.login.userId);
    const favoriteFilms = useSelector(state => state.userProfile.favoriteFilms);
    const dataFavorite = useSelector(state => state.userProfile.dataFavorite);
    const genres = useSelector(state => state.movieInfo.genres);
    const countries = useSelector(state => state.movieInfo.countries);

    useEffect(() => {
        readDataFavorite()
    }, [userId])

    useEffect(() => {
        filterFilms(favoriteFilms, genre, country, maxYear, minYear, maxRate, minRate)
    }, [favoriteFilms, genre, country, maxYear, minYear, maxRate, minRate])

    const showFilters = () => {
        if (filtersState.state) {
            setFiltersState({state: false, style: {'display': 'none'}});
        }
        else {
            setFiltersState({state: true, style: {'display': 'flex'}});
        }
    }

    const clearFilters = () => {
        setGenre(null);
        setCountry(null);
        setMaxYear(null);
        setMinYear(null);
        setMaxRate(10);
        setMinRate(0);
    }

    const filterFilms = (arr, genre, country, maxYear, minYear, maxRate, minRate) => {
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

        setFilteredFilms(filteredFilms)
    }
    
    const renderFavoiteFilms = (arr) => {
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
                    </div>
                    <i class="ph-trash delete"
                        onClick={() => deleteFavoriteFilm(item[0])}></i>
                </div>
            )
        })
        
        return (
            <div className="results-favorite">
                <i class="ph-sliders showFilters" onClick={() => showFilters()}></i>
                <h1 className="result-title">Избранные фильмы</h1>
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

    const content = renderFavoiteFilms(filteredFilms);
    const spinner = loading ? <Spinner/> : null

    return (
        <>  {spinner}
            <div className='favorite-content-wrapper'>
                {dataFavorite ? content : null}
            </div>
        </>
    )
}

export default FavoriteFilms;