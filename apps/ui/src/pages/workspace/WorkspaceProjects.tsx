import React from 'react';
import useWorkspaceContext from '../../context/useWorkspaceContext';
import { AddProject } from '../../components/AddProject';
import { Box } from '@mui/material';
import ProjectCard from './ProjectCard';

export function WorkspaceProjects({}) {
  const [workspaceState] = useWorkspaceContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        px: '2rem',
        flexWrap: 'wrap',
        // bgcolor: 'yellow',
      }}
    >
      <AddProject />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          gap: '2%',
          rowGap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {workspaceState.data?.projects?.map((project: any) => (
          <ProjectCard project={project} />
        ))}
      </Box>
    </Box>
  );
}

// function ProjectCard({ project }) {
//   return (
//     <Card
//       sx={{
//         width: '23.5%',
//         height: '10rem',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//         border: '1px solid black',
//         borderRadius: '5px',
//         boxShadow: ' 0px 8px 16px 0px rgb(0 0 0 / 3%)',
//         bgcolor: '#f1f1f3',
//       }}
//     >
//       <div>{project.name}</div>
//     </Card>
//   );
// }
