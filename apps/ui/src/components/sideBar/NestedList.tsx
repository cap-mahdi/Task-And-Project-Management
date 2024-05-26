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
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

////Exemple of data object to be passed in props after that when fetching data

// const data = {
//   name: 'My personal workspace',

//   projects: [
//     {
//       name: 'Project web ',
//     },
//     {
//       name: 'PPP ',
//     },
//     {
//       name: 'Project RO ',
//     },
//   ],
// };

export function NestedList({ data }) {
  const theme = useTheme();
  const { palette } = theme;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  return (
    <>
      <ListItemMenuButton
        onClick={handleClick}
        selected={false}
        onDoubleClick={() => {
          navigate(`/app/workspace/${data.id}`);
        }}
      >
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
          primary={data.name}
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
              <ListItemMenuButton
                key={uuidv4()}
                sx={{ pl: 4 }}
                onDoubleClick={() => {
                  navigate(`/app/workspace/${data.id}/project/${el.id}`);
                }}
              >
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
