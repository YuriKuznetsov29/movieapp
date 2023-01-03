import {lazy, Suspense} from 'react';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Spinner from './components/Spinner/Spinner';

const MovieList = lazy(() => import('./components/movieList/MovieList'));
const ModalWindow = lazy(() => import('./components/modalWindow/ModalWindow'));
const FindFilms = lazy(() => import('./components/findFilms/FindFilms'));
const LoginForm = lazy(() => import('./components/loginForm/LoginForm'));
const RegForm = lazy(() => import('./components/regForm/RegForm'));
const UserProfile = lazy(() => import('./components/userProfile/UserProfile'));

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
                  <Sidebar>
                    <MovieList />
                    <ModalWindow />
                  </Sidebar>
              </>,
    },{
      path: "/find",
      element: <>
                  <Sidebar>
                    <FindFilms />
                    <ModalWindow />
                  </Sidebar>
              </>,
    },
    {
      path: "/login",
      element: <>
                  <Sidebar>
                    <LoginForm/>
                  </Sidebar>
                </>,
    },
    {
      path: "/registration",
      element: <>
                  <Sidebar>
                    <RegForm/>
                  </Sidebar>
                </>,
    },
    {
      path: "/profile",
      element: <>
                  <Sidebar>
                    <UserProfile />
                    <ModalWindow />
                  </Sidebar>
                </>,
    },
    
  ]);

  return (
    <>
      <Suspense fallback={<Spinner /> + `Loading...`}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
