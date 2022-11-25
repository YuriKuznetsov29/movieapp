import {lazy, Suspense} from 'react';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Spinner from './components/Spinner/Spinner';

const MovieList = lazy(() => import('./components/movieList/MovieList'));
const MovieInfo = lazy(() => import('./components/movieInfo/MovieInfo'));
const FindFilms = lazy(() => import('./components/findFilms/FindFilms'));
const LoginForm = lazy(() => import('./components/loginForm/LoginForm'));
const RegForm = lazy(() => import('./components/regForm/RegForm'));
const UserProfile = lazy(() => import('./components/userProfile/UserProfile'));

function App() {

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
      <Suspense fallback={<span>Loading...</span>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
