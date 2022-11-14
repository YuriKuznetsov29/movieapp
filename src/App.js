import { useState, useEffect } from 'react';
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
            const uid = user.uid;
            const email = user.email;
            console.log(`${email} User is signed in`);
            setAuthStatus(true);
          } else {
            setAuthStatus(false);
            console.log('User is signed out');
          }
        });
  }

  useEffect(() => {
    autorizationStatus(auth)
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
                  <Sidebar authStatus = {authStatus} setAuthStatus = {setAuthStatus}/>
                  <MovieList onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId} setFilmId = {setFilmId}/>
              </>,
    },{
      path: "/find",
      element: <>
                  <Sidebar authStatus = {authStatus} setAuthStatus = {setAuthStatus}/>
                  <FindFilms onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId} setFilmId = {setFilmId}/>
              </>,
    },
    {
      path: "/login",
      element: <>
                  <Sidebar authStatus = {authStatus} setAuthStatus = {setAuthStatus}/>
                  <LoginForm setAuthStatus = {setAuthStatus}/>
                </>,
    },
    {
      path: "/registration",
      element: <>
                  <Sidebar authStatus = {authStatus} setAuthStatus = {setAuthStatus}/>
                  <RegForm/>
                </>,
    },
    {
      path: "/profile",
      element: <>
                  <Sidebar authStatus = {authStatus} setAuthStatus = {setAuthStatus}/>
                  <UserProfile onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId} setFilmId = {setFilmId}/>
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
