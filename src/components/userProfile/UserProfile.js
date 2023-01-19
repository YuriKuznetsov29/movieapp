import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getLoginState } from '../store/selectors';
import { clearFilters } from '../store/reducers/userProfileSlice';
import { Outlet, NavLink } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

import './userProfile.scss'

const UserProfile = () => {
    const [avatar, setAvatar] = useState(null);
    const inputAvatar = useRef(null);

    const dispatch = useDispatch();

    const {email, loginStatus} = useSelector(getLoginState);

    const storage = getStorage();
    const avatarRef = ref(storage, email + '/avatar')


    useEffect(() => {
        getAvatar()
    }, [avatarRef])

    const inputClick = () => {
        inputAvatar.current.click()
    }

    const getAvatar = () => {
        getDownloadURL(avatarRef)
        .then((url) => {
            setAvatar(url)
        })
    }

    const uploadAvatar = (image) => {
        uploadBytes(avatarRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getAvatar()
        });
    }

    const handleChange = (e) => {
        uploadAvatar(e.target.files[0])

    }

    return (
        <>  
            <div className='profileContainer'>
            <div className='profleSidebar'>
                <div className='avatar'>
                    
                    <img src={avatar} alt='avatar'/>
                </div>
                <div className='userInfo'>
                    <div>{email}</div>
                    <div>На сайте</div>
                </div>
                <button className='profileBtn' onClick={() => inputClick()}>Загрузить аватар</button>
                <NavLink to={`/profile/1`} end className="profileBtn"  
                    style={({ isActive}) => { return {background: isActive ? "#555555" : "inherit",};}}
                    onClick={() => clearFilters()}>
                        <div>Избранные фильмы</div>
                </NavLink>
                <NavLink to={`/profile/2`} end className="profileBtn"  
                    style={({ isActive}) => { return {background: isActive ? "#555555" : "inherit",};}}
                    onClick={() => clearFilters()}>
                        <div>Просмотренные фильмы</div>
                </NavLink>
                <input 
                    className='hidden' 
                    type='file' 
                    accept='image/*,.png,.jpg,.gif,.web'
                    ref={inputAvatar} 
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <Outlet/>
            </div>
        </>
    )
}

export default UserProfile;