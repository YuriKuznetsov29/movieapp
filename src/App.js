import { useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import MovieInfo from "./components/movieInfo/MovieInfo";
import MovieList from "./components/movieList/MovieList";
import FindFilms from "./components/findFilms/FindFilms";
import Sidebar from './components/sidebar/Sidebar';
import LoginForm from './components/loginForm/LoginForm';
import RegForm from './components/regForm/RegForm';
import UserProfile from './components/userProfile/UserProfile';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

function App() {

  const [filmId, setFilmId] = useState('');
  const [authStatus, setAuthStatus] = useState(false);

  const onFilmSelected = (id) => {
      setFilmId(id)
  }

  const auth = getAuth();

    const autorizationStatus = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const email = user.email;
              console.log(`${email} User is signed in`);
              setAuthStatus(true);
              // ...
            } else {
              // User is signed out
              // ...
              setAuthStatus(false);
              console.log('User is signed out');
              
            }
          });
    }

  const onAuthStateChange = () => {
    setAuthStatus(!authStatus);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
                  <Sidebar onAuthStateChange = {onAuthStateChange} authStatus = {authStatus}/>
                  <MovieList onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId}/>
              </>,
    },{
      path: "/find",
      element: <>
                  <Sidebar onAuthStateChange = {onAuthStateChange} authStatus = {authStatus}/>
                  <FindFilms onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId}/>
              </>,
    },
    {
      path: "/login",
      element: <>
                  <Sidebar onAuthStateChange = {onAuthStateChange} authStatus = {authStatus}/>
                  <LoginForm onAuthStateChange = {onAuthStateChange} authStatus = {authStatus}/>
                </>,
    },
    {
      path: "/registration",
      element: <>
                  <Sidebar onAuthStateChange = {onAuthStateChange} authStatus = {authStatus}/>
                  <RegForm/>
                </>,
    },
    {
      path: "/profile",
      element: <>
                  <Sidebar onAuthStateChange = {onAuthStateChange} authStatus = {authStatus}/>
                  <UserProfile/>
                  <MovieInfo filmId={filmId}/>
                </>,
    },
    

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
