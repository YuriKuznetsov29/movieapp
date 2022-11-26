import { useEffect, memo } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import MovieService from '../../services/MovieService';
import { setSimilarFilms, setFilmId } from '../store/reducers/movieSlice';
import Slider from 'react-slick';

const SimilarFilms = () => {

    const dispatch = useDispatch();

    const filmId = useSelector(state => state.movieInfo.filmId);
    const similarFilms = useSelector(state => state.movieInfo.similarFilms);

    const { getSimilarFilms } = MovieService();

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

    return (
        <>
            { similarFilms.length >= 5 ? 
                <div className='slider-inner'>
                    <h2>{`Похожие фильмы ${similarFilms.length}`}</h2>
                    <Slider {...settings}>
                            {
                                similarFilms.map(item => {
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
                            }        
                        </Slider>
                </div> : null
            }
        </>
    )
}

export default memo(SimilarFilms);