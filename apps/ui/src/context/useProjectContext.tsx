import { createContext, useContext, useState } from 'react';

interface ProjectState {
  data: string;
}
const initialState: ProjectState = {
  data: '',
};

const ProjectContext = createContext({});

interface ProjectProviderProps {
  children: React.ReactNode;
}

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [state, setState] = useState(initialState);
  return (
    <ProjectContext.Provider value={{ state, setState }}>
      {children}
    </ProjectContext.Provider>
  );
};

const { Provider, Consumer } = ProjectProvider;

export default function useProjectContext() {
  const { state, setState } = useContext(ProjectContext);
  return [state, setState];
}
export { ProjectProvider, useProjectContext };
