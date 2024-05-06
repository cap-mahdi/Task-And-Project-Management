import { RouterProvider } from 'react-router-dom';
import useAppContext from './context/useAppContext';
import { useEffect } from 'react';
import { useUser } from './services/auth';
import { router } from './routers';

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
