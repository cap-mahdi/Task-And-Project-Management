import { createContext, useContext } from 'react';

const initialState = {};
const AppContext = createContext(initialState);
const { Provider, Consumer } = AppContext;

export { AppContext, Provider, Consumer };

export default function useAppContext() {
  const appValue = useContext(AppContext);
  return appValue;
}
