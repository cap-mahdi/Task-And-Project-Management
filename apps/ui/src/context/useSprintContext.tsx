import { createContext, useContext, useState } from 'react';

interface SprintState {
  data: string;
}
const initialState: SprintState = {
  data: '',
};

const SprintContext = createContext({});

interface SprintProviderProps {
  children: React.ReactNode;
}

const SprintProvider = ({ children }: SprintProviderProps) => {
  const [state, setState] = useState(initialState);
  return (
    <SprintContext.Provider value={{ state, setState }}>
      {children}
    </SprintContext.Provider>
  );
};

const { Provider, Consumer } = SprintProvider;

export default function useSprintContext() {
  const { state, setState } = useContext(SprintContext);
  return [state, setState];
}
export { SprintProvider, useSprintContext };
