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

    const {getFilms, loading, getActualMonth} = MovieService();

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
                <>
                <div 
                    className="filmitem"
                    tabIndex={0}
                    ref={filmRef}
                    key={item.id}
                    onClick={() => dispatch(setFilmId(item.id))}
                    onKeyDown={(e) => onKeyDown(e, item.id)}>
                    
                        <img src={item.posterUrl} alt="logo"/>
                    {/* {item.name} */}
                </div>
                
                </>
                
            )
        })
        return (
                <div className="films">
                    {items}
                </div>
        )
    }

    const activeClassMonth = (e) => {
        document.querySelector('.activeMonth').classList.remove('activeMonth');
        e.target.classList.add('activeMonth');
    }

    
    const currentMonth = getActualMonth(new Date().getMonth());
    const previousMonth = new Date().getMonth() - 1 < 0 ? getActualMonth(11) : getActualMonth(new Date().getMonth() - 1);
    const nextMonth = new Date().getMonth() + 1 > 11 ? getActualMonth(0) : getActualMonth(new Date().getMonth() + 1);

    const content = loading ? <Spinner/> : renderFilms(films);

    return (
        
        <>  <div className="premieres">
                <h1>Премьеры</h1>
                <div className="months">
                    <div 
                    onClick={(e) => {
                        getFilms(previousMonth)
                            .then(res => setFilms(res));
                            activeClassMonth(e)}}>
                    {previousMonth}
                    </div>
                    <div
                    className="activeMonth"
                    onClick={(e) => {
                        getFilms()
                            .then(res => setFilms(res));
                            activeClassMonth(e)}}>
                        {currentMonth}
                    </div>
                    <div onClick={(e) => {
                        getFilms(nextMonth)
                            .then(res => setFilms(res));
                            activeClassMonth(e)}}>
                        {nextMonth}
                    </div>
                </div>

            </div>
            <CSSTransition nodeRef={nodeRef} in={inProp} timeout={1000} classNames="my-node">
                <div ref={nodeRef}>
                    {content}
                </div>
            </CSSTransition>
        </>
    )
}

export default MovieList;