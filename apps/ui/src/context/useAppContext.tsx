import { createContext, useContext, useState } from 'react';

interface AppState {
  token?: any;
  user: any;
}
const initialState: AppState = {
  user: null,
};

const AppContext = createContext({});

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  initialState.token = localStorage.getItem('token')?.slice(1, -1);
  const [state, setState] = useState(initialState);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

const { Provider, Consumer } = AppContext;

export default function useAppContext() {
  const { state, setState } = useContext(AppContext);
  return [state, setState];
}
export { AppProvider, useAppContext };
