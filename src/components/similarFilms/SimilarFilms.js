import {useDispatch, useSelector } from 'react-redux';
import MovieService from '../../services/MovieService';
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
    }, [])

    // const renderFilms = (arr) => {
    //     const items = arr.map(item => {
    //         return (
    //             <>
    //                 <img 
    //                     src={item.posterUrl} 
    //                     alt="poster"
    //                     onClick={() => {
    //                         dispatch(setFilmId(item.id));
    //                     }} 
    //                 />
    //             </>
    //         )
    //     })
    //     return (
    //         <Slider {...SimilarFilmsSettings}>
    //             {items}
    //         </Slider>
    //     )
    // }

    return (
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
                    )
                })
            }
        </Slider>
    )
}

export default SimilarFilms;