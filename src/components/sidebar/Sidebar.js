import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogOut, changeStatusOnOnline, changeStatusOnOffline,  } from "../store/reducers/loginSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const loginStatus = useSelector(state => state.login.loginStatus)

    

    const check = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(changeStatusOnOnline(user.email));
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
                                <Link to={`/profile`}>
                                <i class="ph-person"></i>
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
                                <i class="ph-sign-out"
                                onClick={() => {
                                    dispatch(fetchLogOut())
                                }}></i>
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
        </>
    )
    
}

export default Sidebar;