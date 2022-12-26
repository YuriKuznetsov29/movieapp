import { useEffect } from 'react';
import { setFilmId } from '../store/reducers/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState, getMovieInfoState, getUserProfileState } from "../store/selectors";
import { setMaxYear, setMinYear, setGenre, setCountry, setMaxRate, setMinRate, clearFilters, viewedSelector, setFiltersVisibility } from "../store/reducers/userProfileSlice";
import useFirebase from "../../hooks/firebase.hook";

const ViewedFilms = () => {
    const {deleteViewedFilm, readDataViewed} = useFirebase();

    const dispatch = useDispatch();

    const {userId} = useSelector(getLoginState);
    const { dataViewed, gradeFilms, maxRate, minRate, filtersVisibility} = useSelector(getUserProfileState);
    const {genres, countries} = useSelector(getMovieInfoState);
    const viewedFilms = useSelector(viewedSelector);

    useEffect(() => {
        readDataViewed()
    }, [userId])

    const renderViewedFilms = (arr) => {
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
                        {gradeFilms.map((el, i) => {
                            if (item[1].id === el[1].id) {
                                return <div key={i}>Ваша оценка {el[1].grade}</div>
                            }
                        })}
                    </div>
                    <i class="ph-trash delete"
                        onClick={() => deleteViewedFilm(item[0])}></i>
                </div>
            )
        })

        const fimsQuantity = arr.length + ' фильмов';
        const hourseQuantity = Math.floor(arr.reduce((acc, curr) => (acc + (curr[1].time !== null ? curr[1].time : 0) / 60), 0)) + ' часов'; // во viewedFilms нет поля time поэтому сейчас NaN
        const daysQuantity = (arr.reduce((acc, curr) => (acc + (curr[1].time !== null ? curr[1].time : 0) / 60 / 24), 0)).toFixed(1) + ' дней';
        return (
            <div className="results-favorite">
                <i class="ph-sliders showFilters" onClick={() => dispatch(setFiltersVisibility())}></i>
                <h1 className="result-title">Просмотренные фильмы</h1>
                <div className='statistic'>
                    <div className='statItem'>{fimsQuantity}</div>
                    <div className='statItem'>{hourseQuantity}</div>
                    <div className='statItem'>{daysQuantity}</div>

                </div>
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

    const content = renderViewedFilms(viewedFilms);

    return (
        <div className='favorite-content-wrapper'>
            {dataViewed ? content : null}
        </div>
    )
}

export default ViewedFilms;