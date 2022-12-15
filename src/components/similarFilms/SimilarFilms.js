import { useState, useEffect, useCallback, useMemo, memo} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { getMovieInfoState } from '../store/selectors';
import MovieService from '../../services/MovieService';
import { setSimilarFilms, setFilmId } from '../store/reducers/movieSlice';
import Slider from 'react-slick';
import Spinner from '../Spinner/Spinner';


function propsCompare (prevProps, nextProps ) {
    // if (prevProps.similarFilms.length > 0) {
    //     console.log("COMPARE")
    //     return prevProps.similarFilms[0].name === nextProps.similarFilms[0].name;
    // } 
    
    // console.log(prevProps)
    // console.log(nextProps)
    // return false;
    return prevProps.similarFilms === nextProps.similarFilms;
}

const SimilarFilms = () => {
    const [similarFilms, setSimilarFilms] = useState([])
    const dispatch = useDispatch();

    const {filmId} = useSelector(getMovieInfoState);
    // const similarFilms = useSelector(state => state.movieInfo.similarFilms);

    const { getSimilarFilms, loading } = MovieService();

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    useEffect(() => {
        getSimilarFilms(filmId)
            .then(res => dispatch(setSimilarFilms(res)));
        
    }, [filmId])
    

    const renderFilms = (arr) => {
       const items = arr.map(item => {
            return (
                <>
                    <img 
                        src={item.posterUrl} 
                        alt="poster"
                        onClick={() => {
                            dispatch(setFilmId(item.id));
                        }} 
                    />
                </>
            )})

        return (
             arr.length >= 5 ? 
            <div className='slider-inner'>
                <h2>{`Похожие фильмы ${arr.length}`}</h2>
                <Slider {...settings}>
                    {items}        
                </Slider>
            </div> : null
        )
    }

    // const spinner = loading ? <Spinner/> : null
    const content = loading ? <Spinner/> : renderFilms(similarFilms)

    return (
        <>
            {content}
        </>
    )
}

export default memo(SimilarFilms);