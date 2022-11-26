import { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrailars } from "../store/reducers/movieSlice";
import MovieService from "../../services/MovieService";
import Slider from "react-slick";

const Trailers = () => {

    const trailers = useSelector(state => state.movieInfo.trailers);
    
    const settings = {
        dots: true,
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
                    <iframe width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 26))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
            if (item.url.slice(0, 29) ==='https://www.youtube.com/watch') {
                // console.log(item.url)
                // console.log(item.url.slice(0, 27) + '/embed/' + item.url.slice(-(item.url.length - 32)))
                return ( 
                    <iframe width="300" height="200" src={item.url.slice(0, 23) + '/embed/' + item.url.slice(-(item.url.length - 32))} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>                
                )
            }
        })
        return (
            items.length > 1 ?
                <Slider {...settings}>
                    {items}
                </Slider> :
                <>
                    {items}
                </>
        )
    }

    return (
        <>
            {renderTrailars(trailers)}
        </>
    )
}

export default memo(Trailers);