import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilmId } from '../store/reducers/movieSlice';
import { setFavoriteFilms, setFavoriteFilmsData } from "../store/reducers/userProfileSlice";
import { getDatabase, ref, onValue} from "firebase/database";
import MovieService from "../../services/MovieService";
import Spinner from "../Spinner/Spinner";

const FavoriteFilms = () => {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [maxRate, setMaxRate] = useState(10);
    const [minRate, setMinRate] = useState(0);
    const [filtersState, setFiltersState] = useState({state: false, style: {'display': 'none'}});

    const {deleteFavoriteFilm, loading} = MovieService();

    const dispatch = useDispatch();

    const userId = useSelector(state => state.login.userId);
    const favoriteFilms = useSelector(state => state.userProfile.favoriteFilms);
    const dataFavorite = useSelector(state => state.userProfile.dataFavorite);
    const genres = useSelector(state => state.movieInfo.genres);
    const countries = useSelector(state => state.movieInfo.countries);


    useEffect(() => {
        readDataFavorite()
    }, [userId])

    const readDataFavorite = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const dataFavorite = films.val();
        dispatch(setFavoriteFilmsData(dataFavorite));
        dispatch(setFavoriteFilms(Object.entries(dataFavorite)));
    })}

    const showFilters = () => {
        if (filtersState.state) {
            console.log('TRUE')
            setFiltersState({state: false, style: {'display': 'none'}});
        }
        else {
            setFiltersState({state: true, style: {'display': 'flex'}});
        }
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
                        <div>{item[1].year}</div>
                        <div>{item[1].genre}</div>
                        
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
                        <input className="inputYear" placeholder="max год"></input>
                        <input className="inputYear" placeholder="min год"></input>
                    </span>
                    <span>
                        <select className="inputSelect">
                            <option value="none" selected>Выберете страну</option>
                            {countries.map(item => <option value={item.id}>{item.country}</option>)}
                        </select>
                        <select className="inputSelect">
                            <option value="none" selected>Выберете жанр</option>
                            {genres.map(item => <option value={item.id}>{item.genre}</option>)}
                        </select>
                    </span>
                    <span>
                        <label>{`Макс рейтинг ${maxRate}`}</label>
                        <input className='rangeRate' type='range' min='0' max='10' step='1' value={maxRate} onChange={(e) => setMaxRate(e.target.value)}></input>
                        <label>{`Мин рейтинг ${minRate}`}</label>
                        <input className='rangeRate' type='range' min='0' max='10' step='1' value={minRate} onChange={(e) => setMinRate(e.target.value)}></input>
                    </span>
                </div>
                {items}
            </div>
        )
    }

    const content = renderFavoiteFilms(favoriteFilms);
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