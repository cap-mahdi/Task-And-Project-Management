import { Avatar, AvatarGroup } from '@mui/material';
import React from 'react';
interface AvatarGroupDisplayProps {
  avatars: { name: string; src: string }[];
}

export function AvatarGroupDisplay({ avatars = [] }: AvatarGroupDisplayProps) {
  return (
    <AvatarGroup
      max={4}
      spacing="small"
      sx={{
        width: 'fit-content ',
        '.MuiAvatarGroup-avatar	': {
          width: '2rem',
          height: '2rem',
          fontSize: '80%',
        },
      }}
    >
      {avatars.map((avatar) => (
        <Avatar alt={avatar.name} src={avatar.src} />
      ))}
    </AvatarGroup>
  );
}
