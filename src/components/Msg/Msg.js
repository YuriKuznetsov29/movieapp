import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserProfileState } from '../store/selectors';
import { setMsgModalState } from '../store/reducers/userProfileSlice';

import './msg.scss'

const Msg = () => {
    const dispatch = useDispatch();

    const {msgModalState} = useSelector(getUserProfileState);

    const closeMsgModal = (e) => {
        if (e.target.id === 'closeMsg' || e.target.id === 'close') {
            dispatch(setMsgModalState({display: 'none'}));
        }
    }

    return (
        <div className='msg' style={msgModalState}>
            <div className='msgInner'>
                <h3>Войдите или зарегистрируйтесь</h3>
                <div className='button-wrapper'>
                <Link to={`/login`}>
                    <button 
                        className='msgBtn'
                        id='close'
                        tabIndex={1}
                        onClick={(e) => {closeMsgModal(e);}}>
                        Войти
                    </button>
                </Link>
                <Link to={`/registration`}>
                    <button 
                        className='msgBtn'
                        id='close'
                        tabIndex={1}
                        onClick={(e) => {closeMsgModal(e);}}>
                        Зарегистририроваться
                    </button>
                </Link>
                </div>
                <i 
                    className="ph-x msgClose"
                    id='closeMsg'
                    tabIndex={1}
                    onClick={(e) => closeMsgModal(e)}
                >
                </i>
            </div>
        </div>
    )
}
export default Msg;