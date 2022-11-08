import { useEffect, useState } from 'react';
import MovieService from '../../services/MovieService';

import './movieInfo.scss';

const MovieInfo = (props) => {
    const [modalState, setModalState] = useState('infowrapper');
    const [filmInfo, setFilmInfo] = useState({});
    const [gradeState, setGradeState] = useState({state: false, visible: {'display': 'block'}});

    const {getFilmInfo} = MovieService();

    useEffect(() => {
        openModal()

    }, [props.filmId])

    
    const openModal = () => {
        if (props.filmId) {
            loadData();
            document.body.style.overflow = "hidden";
            
            
        }
    }

    const loadData = () => {
        getFilmInfo(props.filmId)
            .then(res => setFilmInfo(res))

        setModalState('infowrapper show');
    }

    const closeModal = (e) => {
        if (e.target.id === 'close') {
            setModalState('infowrapper')
            setFilmInfo({});
            document.body.style.overflow = "auto";
        }
    }

    const onShowGrade = () => {
        setGradeState({state: true, visible: {'display': 'none'}});
    }

    return (
        <>
            <div className={modalState} style={{'background': `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) ), url(${filmInfo.background})`}} id='close' onClick={(e) => closeModal(e)}>
                <i 
                    className="ph-x close"
                    id='close'
                    onClick={() => closeModal()}>
                </i>
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
                            {filmInfo.slogan ? 
                            <div className='filminfostring'>
                                <div>Слоган</div>
                                <div>{filmInfo.slogan}</div>
                            </div> :
                            null}
                            <div className='filminfostring'>
                                <div>Время</div>
                                <div>{`${filmInfo.time} мин.`}</div>
                            </div>
                        </div>
                        <div className='filminfostring'>
                                <div>Описание</div>
                                <div>{filmInfo.description}</div>
                            </div>
                    </div>
                    <div className='raiting'>
                        <button className='btn' style={gradeState.visible}
                        onClick={() => onShowGrade()}>Оценить</button>
                        
                        {gradeState.state ? <div className='choise'>
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
                        </div>: null}                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovieInfo;