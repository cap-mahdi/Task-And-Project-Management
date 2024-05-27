import { createContext, useContext, useState } from 'react';
import { Project } from '../__generated__/graphql';

interface ProjectState {
  project: Project | null;
}
const initialState: ProjectState = {
  project: null,
};

const ProjectContext = createContext({});

interface ProjectProviderProps {
  children: React.ReactNode;
}

const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [state, setState] = useState(initialState);
  console.log('state changedddd ', state);
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
