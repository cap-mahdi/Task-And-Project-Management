import { RouterProvider } from 'react-router-dom';
import { router } from './pages';

export function App() {
  return <RouterProvider router={router} />;
}
