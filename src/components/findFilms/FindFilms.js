import { useState } from 'react';
import MovieService from '../../services/MovieService';

import './findFilms.scss';

const FindFilms = (props) => {
    const [films, setFilms] = useState([]);
    const [keyword, setKeyword] = useState('');
    const {getFilmByName} = MovieService();



    const loadData = () => {
        getFilmByName(keyword)
            .then(res => setFilms(res))
    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <>
                    <div 
                        className='find-poster' 
                        onClick={() => {
                            props.onFilmSelected(item.id);
                        }}>
                            <img src={item.posterUrl} alt="logo"/>
                    </div>
                    <div className='find-info'>
                        <h4>{item.nameEn}</h4>
                        <h4>{item.nameRu}</h4>
                        <div>{item.year}</div>
                        <div>{item.genre}</div>
                    </div>
                </>
            )
        })
        return (
            <div className="results">
                {items}
            </div>

        )
    }

    const content = renderFilms(films);


    return (

        <div className='find-wrapper'>
            <div className='advanced-search'>
                <input className='find-input' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                <div className="options-wrapper">
                    <i class="ph-faders-horizontal"></i>
                    <i className="ph-magnifying-glass" onClick={() => loadData()}></i>
                </div>
            </div>
            {content}
        </div>
    )
}

export default FindFilms;