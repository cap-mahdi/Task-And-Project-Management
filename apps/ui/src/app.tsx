import { RouterProvider, useNavigate } from 'react-router-dom';
import { router } from './pages';
import useAppContext from './context/useAppContext';
import { useEffect } from 'react';
import { checkAuth, useUser } from './services/auth';

export const App = () => {
  const [globalState, setGlobalState] = useAppContext();
  const { user, error } = useUser();

  useEffect(() => {
    if (user && !error) {
      console.log('user from app', user);

      setGlobalState((prevState) => ({
        ...prevState,
        user,
      }));
    }
  }, [user, setGlobalState]);

  return <RouterProvider router={router} />;
};
