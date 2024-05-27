import { createContext, useContext, useState } from 'react';
import { Milestone } from '../__generated__/graphql';

interface SprintState {
  sprint: Milestone | null;
}
const initialState: SprintState = {
  sprint: null,
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
