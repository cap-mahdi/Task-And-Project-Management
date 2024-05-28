import React from 'react';
import useProjectContext from '../../context/useProjectContext';

export function ProjectSprints(props) {
  const [projectState] = useProjectContext();
  return <h1>Project Sprints</h1>;
}
