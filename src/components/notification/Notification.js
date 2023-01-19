import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setNotification, setStartTransition } from "../store/reducers/userProfileSlice";
import { getLoginState, getMovieInfoState, getUserProfileState } from '../store/selectors';
import { createSelector } from "@reduxjs/toolkit";
import { CSSTransition } from "react-transition-group";

import './notification.scss'

const Notification = () => {
    const [inProp, setInProp] = useState(false);
    const notificationRef = useRef(null);
    const dispatch = useDispatch();

    // const notificationSelector = createSelector(
    //     (state) => state.userProfile.notification,
    //     (notification) => notification,
    // )

    // const notification = useSelector(notificationSelector);
    const {notification, startTransition} = useSelector(getUserProfileState);
    const {filmInfo} = useSelector(getMovieInfoState);

    

    useEffect(() => {
        const timeoutNotification = setTimeout(() => {
            dispatch(setStartTransition(false));
            // dispatch(setNotification(null));
        }, 3000);

        return () => {
           clearTimeout(timeoutNotification);
        };
    },[startTransition]);

    

    

    const renderNotification = (notification) => {
        switch (notification) {
            case 'addFavorite':
                return (
                    <div className="notification">
                        <h3>{`Фильм "${filmInfo.name}" добавлен в избранное`}</h3>
                    </div>
                )
            case 'addViewed':
                return (
                    <div className="notification">
                        <h3>{`Фильм "${filmInfo.name}" добавлен в просмотренные`}</h3>
                    </div>
                )
        
            default:
                return null;
        }
    }

    const content = renderNotification(notification)
    return (
        <>
        <CSSTransition notificationRef={notificationRef} in={startTransition} timeout={1000} classNames="my-notification">
            <div ref={notificationRef}>
                {content}
            </div>
        </CSSTransition>
        </>
    )
}

export default Notification;