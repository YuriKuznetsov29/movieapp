import { useState, useEffect, useRef } from 'react';
import {useSelector } from 'react-redux';
import FavoriteFilms from '../favoriteFilms/FavoriteFilms';
import ViewedFilms from '../viewedFilms/ViewedFilms';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

import './userProfile.scss'

const UserProfile = (props) => {
    const [content, setContent] = useState(<FavoriteFilms />);
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const inputAvatar = useRef(null);

    const email = useSelector(state => state.login.email);

    const storage = getStorage();
    const avatarRef = ref(storage, email + 'avatar.jpg');

    useEffect(() => {
        getAvatar()
    }, [avatarRef])

    useEffect(() => {
        uploadAvatar()
    }, [selectedFile])

    const inputClick = () => {
        inputAvatar.current.click()
    }

    const uploadAvatar = () => {
        uploadBytes(avatarRef, selectedFile).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getAvatar()
        });
    }

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const getAvatar = () => {
        getDownloadURL(avatarRef)
        .then((url) => {
            setAvatar(url)
        })
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
                <button className='profileBtn' onClick={() => setContent(<FavoriteFilms />)} >Избранные фильмы</button>
                <button className='profileBtn' onClick={() => setContent(<ViewedFilms />)}>Просмотренные фильмы</button>
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