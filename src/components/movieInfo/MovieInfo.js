import { useEffect, useState } from 'react';
import MovieService from '../../services/MovieService';

import './movieInfo.scss';

const MovieInfo = (props) => {
    const [modalState, setModalState] = useState({'display': 'none'});
    const [filmInfo, setFilmInfo] = useState({});

    const {getFilmInfo} = MovieService();

    useEffect(() => {
        openModal()

    }, [props.filmId])

    
    const openModal = () => {
        if (props.filmId) {
            loadData();
            setModalState({'display': 'block'});
        }
    }

    const loadData = () => {
        getFilmInfo(props.filmId)
            .then(res => setFilmInfo(res));
        console.log(filmInfo);
    }

    const closeModal = () => {
        setModalState({'display': 'none'})
    }


    return (
        
        <>
            <div className='infowrapper' style={modalState}>
                <i className="ph-x close"
                onClick={() => closeModal()}></i>
                <div className='infocontainer'>
                    <div className='poster'>
                        <div className='posterwrapper'>
                            <img src={filmInfo.poster} alt='poster'></img>
                        </div>
                    </div>
                    <div className='info'>
                        <h1>
                            {filmInfo.name}
                        </h1>
                        <h3>О фильме</h3>
                        <div className='filminfo'>
                            <div className='filminfostring'>
                                <div>Год производства</div>
                                <div>{filmInfo.year}</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Страна</div>
                                <div>{filmInfo.country}</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Жанр</div>
                                <div>{filmInfo.genre}</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Слоган</div>
                                <div>{filmInfo.slogan}</div>
                            </div>
                            {/* <div className='filminfostring'>
                                <div>Режиссер</div>
                                <div>Фрэнк Дарабонт</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Сценарий</div>
                                <div>Фрэнк Дарабонт, Стивен Кинг</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Продюсер</div>
                                <div>Лиз Глоцер, Дэвид В. Лестер, Ники Марвин</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Оператор</div>
                                <div>Роджер Дикинс</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Композитор</div>
                                <div>Томас Ньюман</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Художник</div>
                                <div>Теренс Марш, Питер Лэндсдаун Смит, Элизабет МакБрайд, ...</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Монтаж</div>
                                <div>Ричард Фрэнсис-Брюс</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Бюджет</div>
                                <div>$25 000 000</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Сборы в США</div>
                                <div>$28 341 469</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Сборы в мире</div>
                                <div></div>
                            </div>
                            <div className='filminfostring'>
                                <div>Зрители</div>
                                <div>США6.7 млн, Испания1.2 млн, Германия427.2 тыс</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Сборы в России</div>
                                <div>$87 432</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Премьера в Росcии</div>
                                <div>24 октября 2019, «Иноекино»</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Премьера в мире</div>
                                <div>10 сентября 1994</div>
                            </div> */}
                            <div className='filminfostring'>
                                <div>Время</div>
                                <div>{`${filmInfo.time} мин.`}</div>
                            </div>

                        </div>
                    </div>
                    <div className='raiting'>
                        <button className='btn'>Оценить</button>
                        <div className='choise'>
                            <div className='choisewrapper'>
                                <div>
                                    <i className="ph-star star"></i>
                                </div>
                                <div>
                                    <span className='red'>1</span>
                                </div>
                                <div>
                                    <span className='red'>2</span>
                                </div>
                                <div>
                                    <span className='red'>3</span>
                                </div>
                                <div>
                                    <span className='red'>4</span>
                                </div>
                                <div>
                                    <span className='gray'>5</span>
                                </div>
                                <div>
                                    <span className='gray'>6</span>
                                </div>
                                <div>
                                    <span className='green'>7</span>
                                </div>
                                <div>
                                    <span className='green'>8</span>
                                </div>
                                <div>
                                    <span className='green'>9</span>
                                </div>
                                <div>
                                    <span className='green'>10</span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovieInfo;