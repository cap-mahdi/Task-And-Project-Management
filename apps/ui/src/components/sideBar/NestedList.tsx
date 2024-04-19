import { List, ListItemText, Box, useTheme } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3BottomLeftIcon,
  Bars2Icon,
} from '@heroicons/react/24/outline';
import { ListItemMenuButton } from './ListItemMenuButton';
import { useState } from 'react';

////Exemple of data object to be passed in props after that when fetching data

const data = {
  workspace: {
    name: 'My personal workspace',
  },
  projects: [
    {
      name: 'Project web ',
    },
    {
      name: 'PPP ',
    },
    {
      name: 'Project RO ',
    },
  ],
};

export function NestedList() {
  const theme = useTheme();
  const { palette } = theme;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemMenuButton onClick={handleClick} selected={false}>
        <Box
          sx={{
            pr: 1,
            width: 20,
            height: 20,
            m: 0.5,
          }}
          display={'flex'}
          flex={'column'}
          justifyItems={'center'}
        >
          {<Bars3BottomLeftIcon color={palette.blackPearl.main} />}
        </Box>
        <ListItemText
          primary={data.workspace.name}
          sx={{ color: palette.blackPearl.main }}
        />
        {open ? (
          <ChevronDownIcon width={20} />
        ) : (
          <ChevronRightIcon width={20} />
        )}
      </ListItemMenuButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.projects.map((el) => {
            return (
              <ListItemMenuButton sx={{ pl: 4 }}>
                <Box
                  sx={{
                    pr: 1,
                    width: 15,
                    height: 15,
                    m: 0.5,
                  }}
                  display={'flex'}
                  flex={'column'}
                  justifyItems={'center'}
                >
                  {<Bars2Icon color={palette.blackPearl.main} />}
                </Box>
                <ListItemText
                  primary={el.name}
                  sx={{ color: palette.blackPearl.main }}
                />
              </ListItemMenuButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
