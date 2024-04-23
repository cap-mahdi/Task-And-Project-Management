import Divider from '@mui/material/Divider';
import { AddTeamMember, ScheduleSprint } from './';

const SprintSettings = () => {
  return (
    <>
      <AddTeamMember />
      <Divider />
      <ScheduleSprint />
    </>
  );
};

export { SprintSettings };
