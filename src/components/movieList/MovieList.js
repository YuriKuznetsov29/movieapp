import { useState, useEffect } from "react";
import MovieService from '../../services/MovieService';
import { setFilmId } from "../store/reducers/movieSlice";
import { useDispatch } from "react-redux";

import './movieList.scss';

const MovieList = () => {
    const [films, setFilms] = useState([]);

    const {getFilms} = MovieService();

    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
        
        // return clearData();
    }, []);

    const loadData = () => {
        getFilms()
            .then(res => setFilms(res))
    }
    
    // const clearData = () => {
    //     setFilms([])
    // }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className="filmitem"
                onClick={() => {
                    dispatch(setFilmId(item.id));
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
            {content}
        </>
    )
}

export default MovieList;