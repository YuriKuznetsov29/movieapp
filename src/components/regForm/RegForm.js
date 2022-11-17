import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import './regForm.scss'

const RegForm = () => {
    const loginStatus = useSelector(state => state.login.loginStatus);

    const auth = getAuth();

    const register = (auth, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (

        <Formik
            initialValues={{ login: '', password: '', repeatPasword: '' }}
            validationSchema={Yup.object({
                login: Yup.string().required('This field is required'),
                password: Yup.string().required('This field is required'),
                repeatPasword: Yup.string().required('This field is required')
            })}
            onSubmit={(value) => {
                register(auth, value.login, value.password)
            }}
        >
            <Form className="form-wrapper">
                <div className="form-inner">
                    <label>Логин</label>
                    <Field type="text" name="login"></Field>
                    <ErrorMessage name="email" component="div" />
                    <label>Пароль</label>
                    <Field type="password" name="password"></Field>
                    <ErrorMessage name="password" component="div" />
                    <label>Пароль</label>
                    <Field type="password" name="repeatPasword"></Field>
                    <ErrorMessage name="repeatPasword" component="div" />
                    <button className='formbtn' type="submit">Зарегистрироваться</button>
                </div>
                {loginStatus && 
                        (<Navigate to="/profile" replace={true} />
                    )}
            </Form>
        </Formik>

    )
}
export default RegForm;