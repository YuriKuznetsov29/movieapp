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
import MovieForm from './components/movieForm/MovieForm';

function App() {

  const [filmId, setFilmId] = useState('');

  const onFilmSelected = (id) => {
      setFilmId(id)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
                  <Sidebar/>
                  <MovieList onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId}/>
              </>,
    },{
      path: "/find",
      element: <>
                  <Sidebar/>
                  <FindFilms onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId}/>
              </>,
    },
    {
      path: "/login",
      element: <>
                  <Sidebar/>
                  <MovieForm/>
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
