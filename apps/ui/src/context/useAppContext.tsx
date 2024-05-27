import { createContext, useContext, useState } from 'react';

interface AppState {
  token?: any;
  user: any;
  events?: any;
}
const initialState: AppState = {
  user: null,
  events: {
    CREATE_WORKSPACE: 0,
    CREATE_PROJECT: 0,
    CREATE_MILESTONE: 0,
    CREATE_TASK: 0,
  },
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
