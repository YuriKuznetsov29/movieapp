import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import MovieInfo from "./components/movieInfo/MovieInfo";
import MovieList from "./components/movieList/MovieList";
import FindFilms from "./components/findFilms/FindFilms";
import Sidebar from './components/sidebar/Sidebar';
import LoginForm from './components/loginForm/LoginForm';
import RegForm from './components/regForm/RegForm';
import UserProfile from './components/userProfile/UserProfile';

function App() {

  const [filmId, setFilmId] = useState('');

  // const onFilmSelected = (id) => {
  //     setFilmId(id)
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
                  <Sidebar/>
                  <MovieList />
                  <MovieInfo />
              </>,
    },{
      path: "/find",
      element: <>
                  <Sidebar/>
                  <FindFilms />
                  <MovieInfo />
              </>,
    },
    {
      path: "/login",
      element: <>
                  <Sidebar/>
                  <LoginForm/>
                </>,
    },
    {
      path: "/registration",
      element: <>
                  <Sidebar/>
                  <RegForm/>
                </>,
    },
    {
      path: "/profile",
      element: <>
                  <Sidebar/>
                  <UserProfile />
                  <MovieInfo />
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
