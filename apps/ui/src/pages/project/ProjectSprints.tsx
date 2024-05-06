import React from 'react';
import useProjectContext from '../../context/useProjectContext';

export function ProjectSprints(props) {
  const [projectState] = useProjectContext();
  console.log('ProjectSprints', projectState);
  return <h1>Project Sprints</h1>;
}
