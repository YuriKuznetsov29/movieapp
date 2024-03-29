import { useState, useEffect } from 'react';
import MovieService from '../../services/MovieService';
import { setFilmId } from '../store/reducers/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieInfoState } from '../store/selectors';
import Spinner from '../Spinner/Spinner';

import './findFilms.scss';

const FindFilms = (props) => {
    const [films, setFilms] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [country, setCountry] = useState('');
    const [genre, setGenre] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [maxRate, setMaxRate] = useState(10);
    const [minRate, setMinRate] = useState(0);
    const [optionState, setOptionState] = useState({state: false, visible: {'display': 'none'}});

    const {genres, countries} = useSelector(getMovieInfoState);

    const {getFilmByName, getFimsByParametrs, loading} = MovieService();
    const dispatch = useDispatch();

    const loadDataByKeyword = () => {
        getFilmByName(keyword)
            .then(res => setFilms(res))
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter") loadDataByKeyword();
    }

    const loadDataByParametrs = () => {
        getFimsByParametrs(country, genre, startYear, endYear, minRate, maxRate)
            .then(res => setFilms(res))
    }

    const showOptions = () => {
        let state = optionState.state;
        state = !state;
        state ? setOptionState({state: true, visible: {'display': 'flex'}}) : setOptionState({state: false, visible: {'display': 'none'}});
    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='item-inner' key={item.id}>
                    <div 
                        className='find-poster' 
                        onClick={() => {
                            dispatch(setFilmId(item.id));
                        }}>
                            <img src={item.posterUrl} alt="logo"/>
                    </div>
                    <div className='find-info'>
                        <h4>{item.nameEn}</h4>
                        <h4>{item.nameRu}</h4>
                        <div>{item.year}</div>
                        <div>{item.genre}</div>
                    </div>
                </div>
            )
        })
        return (
            <div className="results">
                {items}
            </div>

        )
    }

    const renderCountries = (arr) => {
        const items = arr.map(item => {
            return (
                <option value={item.id} key={item.id}>{item.country}</option>
            )
        })
        return (
            <select name="select" onChange={(e) => setCountry(e.target.value)}>
                <option value="none" selected>Выберете страну</option>
                {items}
            </select>

        )
    }

    const renderGenres = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <option value={item.id} key={item.id}>{item.genre}</option>
            )
        })
        return (
            <select name="select" onChange={(e) => setGenre(e.target.value)}>
                <option value="none" selected>Выберете жанр</option>
                {items}
            </select>
        )
    }

    const content = loading ? <Spinner/> : renderFilms(films);
    const countriesTransform = renderCountries(countries);
    const genresTransform = renderGenres(genres);

    return (

        <div className='find-wrapper'>
            <div className='advanced-search'>
                <input className='find-input' value={keyword} onChange={(e) => setKeyword(e.target.value)}  onKeyDown={(e) => onKeyDown(e)}/>
                <div className="buttons-wrapper">
                    <i class="ph-faders-horizontal" onClick={() => showOptions()}></i>
                    <i className="ph-magnifying-glass" onClick={() => loadDataByKeyword()}></i>
                </div>
                <div className="options-inner" style={optionState.visible}>
                    <label>Страны</label>
                    {countriesTransform}
                    <label>Жанры</label>
                    {genresTransform}
                    <label>Минимальный год</label>
                    <input className='parametersFind' type='text' value={startYear} onChange={(e) => setStartYear(e.target.value)}></input>
                    <label>Максимальный год</label>
                    <input className='parametersFind' type='text' value={endYear} onChange={(e) => setEndYear(e.target.value)}></input>
                    <label>{`Максимальный рейтинг ${maxRate}`}</label>
                    <input className='rangeRate' type='range' min='0' max='10' step='1' value={maxRate} onChange={(e) => setMaxRate(e.target.value)}></input>
                    <label>{`Минимальный рейтинг ${minRate}`}</label>
                    <input className='rangeRate' type='range' min='0' max='10' step='1' value={minRate} onChange={(e) => setMinRate(e.target.value)}></input>
                    <button className='btn-find' type='submit' onClick={() => loadDataByParametrs()}>Найти</button>
                </div>
            </div>
                {content}
        </div>
    )
}

export default FindFilms;