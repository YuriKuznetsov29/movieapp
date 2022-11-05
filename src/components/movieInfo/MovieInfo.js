import './movieInfo.scss';

const MovieInfo = () => {
    return (
        <>
            <div className='infowrapper'>
                <i className="ph-x close"></i>
                <div className='infocontainer'>
                    <div className='poster'>
                        <div className='posterwrapper'>
                            <img src='https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/207fdfc7-25b9-4fb4-ada1-09acaec1e844/300x450' alt='logo'></img>
                        </div>
                    </div>
                    <div className='info'>
                        <h1>
                            Бандитский Петербург: Барон (мини–сериал 2000)
                        </h1>
                        <h3>О фильме</h3>
                        <div className='filminfo'>
                            <div className='filminfostring'>
                                <div>Год производства</div>
                                <div>1994</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Страна</div>
                                <div>США</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Жанр</div>
                                <div>драма</div>
                            </div>
                            <div className='filminfostring'>
                                <div>Слоган</div>
                                <div>«Страх - это кандалы. Надежда - это свобода»</div>
                            </div>
                            <div className='filminfostring'>
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
                            </div>
                            <div className='filminfostring'>
                                <div>Время</div>
                                <div>142 мин. / 02:22</div>
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