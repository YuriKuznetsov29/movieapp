import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './movieForm.scss'

const MovieForm = () => {
    return (

        <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={Yup.object({
                login: Yup.string().required('This field is required'),
                password: Yup.string().required('This field is required')
            })}
            onSubmit={(value) => {
                console.log(value.login)
                console.log(value.password)
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
                    <button className='formbtn' type="submit">Войти</button>

                    {/* <label>Логин</label>
                    <input></input>
                    <label>Пароль</label>
                    <input></input>
                    <label>Подтвердите пароль</label>
                    <input></input>
                    <button className='formbtn'>Зарегистрироваться</button> */}
                </div>
            </Form>
        </Formik>

    )
}
export default MovieForm;