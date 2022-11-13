import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { Link } from "react-router-dom";


import './loginForm.scss'

const LoginForm = (props) => {

    const auth = getAuth();

    const login = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const email = user.email;
              console.log(`${email} User is signed in`);
            props.onAuthStateChange();
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message);
        });

    }

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log('User is signed in')
              // ...
            } else {
              // User is signed out
              // ...
              console.log('User is signed out')
            }
          });
    }

    return (

        <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={Yup.object({
                login: Yup.string().required('This field is required'),
                password: Yup.string().required('This field is required')
            })}
            onSubmit={(value) => {
                login(auth, value.login, value.password)
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
                    <Link to={'/registration'}>
                        <div>Зарегистрироваться</div>
                    </Link>
                </div>
            </Form>
        </Formik>

    )
}
export default LoginForm;