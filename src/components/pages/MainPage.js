import { useState } from 'react';
import MovieList from '../movieList/MovieList';
import MovieInfo from '../movieInfo/MovieInfo';

import './mainPage.scss'

const MainPage = () => {
    const [filmId, setFilmId] = useState('');

    const onFilmSelected = (id) => {
        setFilmId(id)
    }

    return (
        <>
            <aside className="sidebar">
                <nav>
                    <ul className="navigation">
                        <li>
                            <i className="ph-house"></i>
                        </li>
                        <li>
                            <i className="ph-magnifying-glass"></i>
                        </li>
                        <li>
                            <i className="ph-user"></i>
                        </li>
                    </ul>
                </nav>
            </aside>
            <MovieList onFilmSelected={onFilmSelected}/>
            <MovieInfo filmId={filmId}/>
        </>
    )
}

export default MainPage;