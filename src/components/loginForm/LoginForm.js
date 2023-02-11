import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from "../store/selectors";
import { fetchLogin } from '../store/reducers/loginSlice';

import './loginForm.scss'

const LoginForm = () => {

    const dispatch = useDispatch();

    const {loginStatus} = useSelector(getLoginState);

    return (

        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().required('Обязательное поле')
                                .email('Неправильный формат email'),
                password: Yup.string().required('Обязательное поле')
            })}
            onSubmit={(value) => {
                dispatch(fetchLogin({email: value.email, password: value.password}))
            }}
        >
            <Form className="form-wrapper">
                <div className="form-inner">
                    <Field type="email" name="email" placeholder="Email"></Field>
                    <ErrorMessage className='error-message' name="email" component="div" />
                    <Field type="password" name="password" placeholder="Пароль"></Field>
                    <ErrorMessage className='error-message' name="password" component="div" />
                    <button className='formbtn input-btn' type="submit">Войти</button>
                    <Link className='formbtn link'  to={'/registration'}>
                        <span className='link-inner'>
                            Зарегистрироваться
                        </span>
                    </Link>
                </div>
                {loginStatus && 
                    (<Navigate to="/profile" replace={true} />)
                }
            </Form>
        </Formik>

    )
}
export default LoginForm;