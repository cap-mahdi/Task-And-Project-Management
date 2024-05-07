import { createContext, useContext, useState } from 'react';

interface WorkspaceState {
  data: string;
}
const initialState: WorkspaceState = {
  data: '',
};

const WorkspaceContext = createContext({});

interface WorkspaceProviderProps {
  children: React.ReactNode;
}

const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {
  const [state, setState] = useState(initialState);
  return (
    <WorkspaceContext.Provider value={{ state, setState }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

const { Provider, Consumer } = WorkspaceProvider;

export default function useWorkspaceContext() {
  const { state, setState } = useContext(WorkspaceContext);
  return [state, setState];
}
export { WorkspaceProvider, useWorkspaceContext };
