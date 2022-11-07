import { useState, useEffect } from "react";
import MovieService from '../../services/MovieService';

import './movieList.scss';

const MovieList = (props) => {
    const [films, setFilms] = useState([]);

    const {getFilms} = MovieService();

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        getFilms()
            .then(res => setFilms(res))
    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className="filmitem"
                onClick={() => {
                    props.onFilmSelected(item.id);
                }}>
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
            <div>
            {content}
            <button className="btn">
                Load more
            </button>
            </div>
        </>
    )
}

export default MovieList;