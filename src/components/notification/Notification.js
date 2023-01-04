import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/reducers/userProfileSlice";
import { getLoginState, getMovieInfoState, getUserProfileState } from '../store/selectors';
import { createSelector } from "@reduxjs/toolkit";

import './notification.scss'

const Notification = () => {
    const dispatch = useDispatch();

    // const notificationSelector = createSelector(
    //     (state) => state.userProfile.notification,
    //     (notification) => notification,
    // )

    // const notification = useSelector(notificationSelector);
    const {notification} = useSelector(getUserProfileState);
    const {filmInfo} = useSelector(getMovieInfoState);

    

    useEffect(() => {
        const timeoutNotification = setTimeout(() => {
            dispatch(setNotification(null));
        }, 3000);
        console.log('render');

        return () => {
           clearTimeout(timeoutNotification);
        };
    },[notification]);

    

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
            {content}
        </>
    )
}

export default Notification;