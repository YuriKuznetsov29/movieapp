import { useEffect } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { setFilmId } from '../store/reducers/movieSlice';
import { setViewedFilms, setViewdFilmsData } from '../store/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import MovieService from '../../services/MovieService';

const ViewedFilms = () => {

    const {deleteViewedFilm} = MovieService();

    const dispatch = useDispatch();


    const userId = useSelector(state => state.login.userId);
    const viewedFilms = useSelector(state => state.userProfile.viewedFilms);
    const dataViewed = useSelector(state => state.userProfile.dataViewed);
    const gradeFilms = useSelector(state => state.userProfile.gradeFilms);

    useEffect(() => {
        readDataViewed()
    }, [userId])

    const readDataViewed = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/viewedFilms/');
        onValue(Ref, (films) => {
        const dataViewed = films.val();
        dispatch(setViewdFilmsData(dataViewed));
        dispatch(setViewedFilms(Object.entries(dataViewed)));
    })}

    const renderViewedFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='favorite-item-inner'>
                    <div 
                        className='favorite-poster'
                        onClick={() => {
                            dispatch(setFilmId(item[1].id))
                        }}>
                            <img src={item[1].poster} alt="logo"/>
                    </div>
                    <div className='favorite-info'>
                        <h4>{item[1].name}</h4>
                        <div>{item[1].year}</div>
                        <div>{item[1].genre}</div>
                        {gradeFilms.map(el => {
                            if (item[1].id === el[1].id) {
                                return <div>Ваша оценка {el[1].grade}</div>
                            }
                        })}
                        
                    </div>
                    <i class="ph-trash delete"
                        onClick={() => deleteViewedFilm(item[0])}></i>
                </div>
            )
        })
        return (
            <div className="results-favorite">
                <h1 className="result-title">Просмотренные фильмы</h1>
                {items}
            </div>

        )
    }

    const content = renderViewedFilms(viewedFilms);

    return (
        <>
            <div className='favorite-content-wrapper'>
                {dataViewed ? content : null}
            </div>
        </>
    )
}

export default ViewedFilms;