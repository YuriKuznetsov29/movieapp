import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieInfoState } from "../store/selectors";
import MovieService from "../../services/MovieService";
import { setStaff } from "../store/reducers/movieSlice";

const ActorsOfCurrentFilm = () => {
    const {filmId, staff} = useSelector(getMovieInfoState);

    const {getStaff} = MovieService();

    const dispatch = useDispatch();

    useEffect(() => {
        getStaff(filmId)
            .then(res => dispatch(setStaff(res)));
    }, [filmId])

    const renderActors = (arr) => {
        const items = arr.map((item, i) => {
                if (i < 9) {
                    return (
                        <>
                            <div key={item.id}>{item.nameRu}</div>
                        </>
                    )
                }
            }
        )
        return (
            <div>
                <h3>{`В главных ролях ${staff.actors.length}`}</h3>
                {items}
            </div>
        )
    }

    // const actors = renderActors(staff.actors);

    return (
        renderActors(staff.actors)
    )
}

export default memo(ActorsOfCurrentFilm);