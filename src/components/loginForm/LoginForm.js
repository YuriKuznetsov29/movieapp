import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from './loginSlice';

import './loginForm.scss'

const LoginForm = () => {

    const dispatch = useDispatch();

    const loginStatus = useSelector(state => state.login.loginStatus);

    return (

        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().required('This field is required'),
                password: Yup.string().required('This field is required')
            })}
            onSubmit={(value) => {
                dispatch(fetchLogin({email: value.email, password: value.password}))
                
            }}
        >
            <Form className="form-wrapper">
                <div className="form-inner">
                    <label>Email</label>
                    <Field type="email" name="email"></Field>
                    <ErrorMessage name="email" component="div" />
                    <label>Пароль</label>
                    <Field type="password" name="password"></Field>
                    <ErrorMessage name="password" component="div" />
                    <button className='formbtn' type="submit">Войти</button>
                    <Link to={'/registration'}>
                        <div>Зарегистрироваться</div>
                    </Link>
                </div>
                {loginStatus && 
                        (<Navigate to="/profile" replace={true} />
                    )}
            </Form>
        </Formik>

    )
}
export default LoginForm;