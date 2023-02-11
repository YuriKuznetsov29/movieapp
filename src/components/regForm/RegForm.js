import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, set} from "firebase/database";
import { useSelector } from 'react-redux';
import { getLoginState } from '../store/selectors';
import { Navigate } from "react-router-dom";

import './regForm.scss'

const RegForm = () => {
    const {loginStatus} = useSelector(getLoginState);

    const auth = getAuth();

    const register = (auth, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                const uid = user.uid;
                const db = getDatabase();
                set(ref(db, `users/` + uid + `/favoriteFilms/`), null);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (

        <Formik
            initialValues={{ email: '', password: '', repeatPasword: '' }}
            validationSchema={Yup.object({
                email: Yup.string().required('Обязательное поле')
                                .email('Неправильный формат email'),
                password: Yup.string().required('Обязательное поле')
                                    .min(6, 'минимальное количество 6 символов'),
                repeatPasword: Yup.string().required('Обязательное поле')
                                        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
            })}
            onSubmit={(value) => {
                register(auth, value.email, value.password)
            }}
        >
            <Form className="form-wrapper">
                <div className="form-inner">
                    <Field type="email" name="email" placeholder="Email"></Field>
                    <ErrorMessage className='error-message' name="email" component="div" />
                    <Field type="password" name="password" placeholder="Пароль"></Field>
                    <ErrorMessage className='error-message' name="password" component="div" />
                    <Field type="password" name="repeatPasword" placeholder="Повторите пароль"></Field>
                    <ErrorMessage className='error-message' name="repeatPasword" component="div" />
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