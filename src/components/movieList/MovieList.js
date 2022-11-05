import { useState, useEffect } from "react";
import MovieService from '../../services/MovieService';

import './movieList.scss';

const MovieList = () => {
    const [films, setFilms] = useState([]);

    const {getFilms} = MovieService();

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getFilms()
            .then(res => setFilms(res))
        console.log(films)

    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className="filmitem">
                    <img src={item.posterUrl} alt="logo"/>
                </div>
            )
        })
        return (
            <div className="films">
                {items}
            </div>

        )
    }

    const content = renderFilms(films);

    return (
        <>  
            {content}
            <button className="btn">
                Load more
            </button>
        </>
    )
}

export default MovieList;