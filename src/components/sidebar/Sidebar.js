import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

import './sidebar.scss';

const Sidebar = (props) => {

    const auth = getAuth();

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const email = user.email;
              console.log(`${email} User is signed in`);
              // ...
            } else {
              // User is signed out
              // ...
              console.log('User is signed out');
              
            }
          });
    }

    const exit = (auth) => {
            signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Sign-out successful.')
            props.onAuthStateChange();

            }).catch((error) => {
            // An error happened.
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
                        <li>
                            <Link to={`/profile`}>
                            <i class="ph-person"></i>
                            </Link>
                        </li>
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