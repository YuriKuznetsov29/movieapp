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

function App() {

  const [filmId, setFilmId] = useState('');

  const onFilmSelected = (id) => {
      setFilmId(id)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
                  <MainPage/>
                  <MovieList onFilmSelected={onFilmSelected}/>
                  <MovieInfo filmId={filmId}/>
              </>,
    },{
      path: "/find",
      element: <>
                  <MainPage/>
                  <FindFilms onFilmSelected={onFilmSelected}/>
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
