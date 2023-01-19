import { useState, useEffect, useRef } from "react";
import MovieService from '../../services/MovieService';
import { setFilmId } from "../store/reducers/movieSlice";
import { useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { CSSTransition } from "react-transition-group";

import './movieList.scss';

const MovieList = () => {
    const [films, setFilms] = useState([]);
    const [inProp, setInProp] = useState(false)
    const filmRef = useRef(null);

    const nodeRef = useRef(null);

    const {getFilms, loading} = MovieService();

    const dispatch = useDispatch();

    useEffect(() => {
        // loadData();
        getFilms()
            .then(res => setFilms(res))
        console.log('render')
        setInProp(true);
    }, []);

    // const loadData = () => {
    //     getFilms()
    //         .then(res => setFilms(res))
    // }
    
    const onKeyDown = (e, id) => {
        if (e.key === "Enter") dispatch(setFilmId(id));
    }

    const renderFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div 
                    className="filmitem"
                    tabIndex={0}
                    ref={filmRef}
                    key={item.id}
                    onClick={() => dispatch(setFilmId(item.id))}
                    onKeyDown={(e) => onKeyDown(e, item.id)}>
                    
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

    const content = loading ? <Spinner/> : renderFilms(films);

    return (
        <>  
            <CSSTransition nodeRef={nodeRef} in={inProp} timeout={1000} classNames="my-node">
                <div ref={nodeRef}>
                    {content}
                </div>
            </CSSTransition>
        </>
    )
}

export default MovieList;