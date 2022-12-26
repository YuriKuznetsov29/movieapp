import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { getLoginState } from '../store/selectors';
import { clearFilters } from '../store/reducers/userProfileSlice';
import FavoriteFilms from '../favoriteFilms/FavoriteFilms';
import ViewedFilms from '../viewedFilms/ViewedFilms';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

import './userProfile.scss'

const UserProfile = () => {
    const [content, setContent] = useState(<FavoriteFilms />);
    const [avatar, setAvatar] = useState(null);
    const inputAvatar = useRef(null);
    const [btnClass, setBtnClass] = useState({btnFavorite: 'profileBtn profileBtnActive', btnViewed: 'profileBtn'})

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

    const activeButton = (key) => {
        switch (key) {
         case FavoriteFilms:
             setBtnClass({btnFavorite: 'profileBtn profileBtnActive', btnViewed: 'profileBtn'})
             break;
         case ViewedFilms:
             setBtnClass({btnFavorite: 'profileBtn', btnViewed: 'profileBtn profileBtnActive'})
             break;
         default:
             setBtnClass({btnFavorite: 'profileBtn profileBtnActive', btnViewed: 'profileBtn'})
             break;
        }
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
                <button className={btnClass.btnFavorite} onClick={() => {setContent(<FavoriteFilms />); activeButton(FavoriteFilms); dispatch(clearFilters())}} >Избранные фильмы</button>
                <button className={btnClass.btnViewed} onClick={() => {setContent(<ViewedFilms />); activeButton(ViewedFilms); dispatch(clearFilters())}}>Просмотренные фильмы</button>
                <input 
                    className='hidden' 
                    type='file' 
                    accept='image/*,.png,.jpg,.gif,.web'
                    ref={inputAvatar} 
                    onChange={(e) => handleChange(e)}
                />
            </div>
            {content}
            </div>
        </>
    )
}

export default UserProfile;