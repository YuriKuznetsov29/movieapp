import { memo } from "react";
import { useSelector } from "react-redux";
import { getMovieInfoState } from '../store/selectors';

const MovieInfo = ({buttons, grade, actors, trailer}) => {
    const {filmInfo} = useSelector(getMovieInfoState);

    return (
        <div className='infocontainer'>
            <div className='poster'>
                <div className='posterwrapper'>
                    <img src={filmInfo.poster} alt='poster'></img>
                </div>
                {trailer}
            </div>
            <div className='info'>
                <h1>
                    {filmInfo.name} 
                </h1>
                {buttons}
                <div className='filminfo'>
                    <div className='filminfostring'>
                        <div className='info-line'>Год производства</div>
                        <div className='info-line-data'>{filmInfo.year}</div>
                    </div>
                    <div className='filminfostring'>
                        <div className='info-line'>Страна</div>
                        <div className='info-line-data'>{filmInfo.country}</div>
                    </div>
                    <div className='filminfostring'>
                        <div className='info-line'>Жанр</div>
                        <div className='info-line-data'>{filmInfo.genre}</div>
                    </div>
                    {filmInfo.slogan ? 
                    <div className='filminfostring'>
                        <div className='info-line'>Слоган</div>
                        <div className='info-line-data'>{filmInfo.slogan}</div>
                    </div> :
                    null}
                    <div className='filminfostring'>
                        <div className='info-line'>Время</div>
                        <div className='info-line-data'>{`${filmInfo.time} мин.`}</div>
                    </div>
                </div>
                <div className='filminfostring'>
                    <div className='info-line'>Описание</div>
                    <div className='info-line-data'>{filmInfo.description}</div>
                </div>
            </div>
            <div className='raiting'>
                {grade}
                {filmInfo.ratingKinopoisk ? `Рейтинг кинопоиска ${filmInfo.ratingKinopoisk}` : null}
                {actors}                      
            </div>
    </div>
    )
}

export default MovieInfo;