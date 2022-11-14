import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

import './sidebar.scss';

const Sidebar = (props) => {

    const auth = getAuth();

    const exit = (auth) => {
            signOut(auth).then(() => {
                console.log('Sign-out successful.')
                props.setAuthStatus(false);
            })
            .catch((error) => {
                console.log('An error happened.')
            });
    }

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
                        { props.authStatus ?
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
                        { props.authStatus ?
                            <li>
                                <i class="ph-sign-out"
                                onClick={() => {
                                    exit(auth)
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