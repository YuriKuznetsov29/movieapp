import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieInfoState } from '../store/selectors';
import { setTrailars } from "../store/reducers/movieSlice";
import MovieService from "../../services/MovieService";
import Slider from "react-slick";

const Trailers = () => {

    const {trailers} = useSelector(getMovieInfoState);
    
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        lazyLoad: "ondemand",
    };

    const renderTrailars = (arr) => {
        const items = arr.map(item => {
            if (item.url.slice(0, 25) === 'https://www.youtube.com/v') {
                // console.log(item.url)
                // console.log(item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26)))
                return ( 
                    <iframe key={item.id} width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
            if (item.url.slice(0, 29) ==='https://www.youtube.com/watch') {
                // console.log(item.url)
                // console.log(item.url.slice(0, 27) + '/embed/' + item.url.slice(-(item.url.length - 32)))
                return ( 
                    <iframe key={item.id} width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 32))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
        })
        return (
            items.length > 1 ?
            <div className='slider-inner'>
                <h2>{`Тизеры и Трейлеры ${trailers.length}`}</h2>
                <Slider {...settings}>
                    {items}
                </Slider> 
            </div>
            :
            <div className='trailer-inner'>
                {items}
            </div>
        )
    }

    const content = renderTrailars(trailers)

    return (
        <>
            {content}
        </>
    )
}

export default memo(Trailers);