import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState, getUserProfileState } from "../store/selectors";
import { fetchLogOut, changeStatusOnOnline, changeStatusOnOffline } from "../store/reducers/loginSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setViewdFilmsData, setViewedFilms, setFavoriteFilms, setFavoriteFilmsData, setGradeFilms } from "../store/reducers/userProfileSlice";
import useFirebase from "../../hooks/firebase.hook";

import './sidebar.scss';

const Sidebar = (props) => {
    const dispatch = useDispatch();

    const {getAvatar} = useFirebase();
    const auth = getAuth();

    const {loginStatus, userId, email} = useSelector(getLoginState)
    const {avatar} = useSelector(getUserProfileState);

    const check = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(changeStatusOnOnline({email: user.email, userId: user.uid}));
            } else {
                dispatch(changeStatusOnOffline());
            }
        })
    }

    useEffect(() => {
        check(auth);
      }, [])

    return (
        <>
            <aside className="sidebar">
                <nav>
                    <ul className="navigation">
                        <li>
                            <Link to={`/`}>
                                <i className="ph-house"></i>
                            </Link>
                        </li>
                        { loginStatus ?
                            <li>
                                <Link to={`/profile/1`}>
                                    {avatar ? <img className="avatarIconNav" src={avatar} title={email}></img> : <i class="ph-person" title={email}></i>}
                                </Link> 
                            </li> : null
                        }
                        <li>
                            <Link to={'/find'}>
                                <i className="ph-magnifying-glass"></i>
                            </Link>
                        </li>
                        { loginStatus ?
                            <li>
                                <Link to={'/'}>
                                    <i class="ph-sign-out"
                                    onClick={() => {
                                        dispatch(fetchLogOut())
                                        dispatch(setViewdFilmsData({}));
                                        dispatch(setViewedFilms([]));
                                        dispatch(setFavoriteFilmsData({}));
                                        dispatch(setFavoriteFilms([]));
                                        dispatch(setGradeFilms([]));
                                    }}></i>
                                </Link>
                            </li>
                                :
                            <li>
                                <Link to={'/login'}>
                                <i className="ph-user"></i>
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </aside>
            {props.children}
        </>
    )
    
}

export default Sidebar;