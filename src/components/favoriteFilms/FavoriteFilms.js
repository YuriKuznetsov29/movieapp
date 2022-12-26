import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoginState, getMovieInfoState, getUserProfileState  } from "../store/selectors";
import { setFilmId } from '../store/reducers/movieSlice';
import { setMaxYear, setMinYear, setGenre, setCountry, setMaxRate, setMinRate, clearFilters, favoriteSelector, setFiltersVisibility } from "../store/reducers/userProfileSlice";
import MovieService from "../../services/MovieService";
import useFirebase from "../../hooks/firebase.hook";
import Spinner from "../Spinner/Spinner";

const FavoriteFilms = () => {
    const {loading} = MovieService();
    const {deleteFavoriteFilm, readDataFavorite} = useFirebase();

    const dispatch = useDispatch();

    const {dataFavorite, maxRate, minRate, filtersVisibility} = useSelector(getUserProfileState);
    const {genres, countries} = useSelector(getMovieInfoState);
    const {userId} = useSelector(getLoginState);
    const favoriteFilms = useSelector(favoriteSelector);

    useEffect(() => {
        readDataFavorite()
    }, [userId])
    
    const renderFavoiteFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='favorite-item-inner' key={item[1].id}>
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
                <i class="ph-sliders showFilters" onClick={() => dispatch(setFiltersVisibility())}></i>
                <h1 className="result-title">Избранные фильмы</h1>
                <div className="filters" style={filtersVisibility ? {'display': 'flex'} : {'display': 'none'}}>
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

    const content = renderFavoiteFilms(favoriteFilms);

    return (
        <div className='favorite-content-wrapper'>
            {loading ? <Spinner/> : null}
            {dataFavorite ? content : null}
        </div>
    )
}

export default FavoriteFilms;