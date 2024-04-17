import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import { PlusIcon } from '@heroicons/react/24/outline';

import { useTheme } from '@mui/material';

import Search from './Search';
import { ListItemMenuButton } from './ListItemMenuButton';
import menuButtons from './menuButtonsData';
import NestedList from './NestedList';

const drawerWidth = 270;

export default function SideBar() {
  const theme = useTheme();
  const { palette, typography } = theme;

  const [selectedMenu, setSelectedMenu] = React.useState('Home');
  const handleMenuClick = (e, details) => {
    setSelectedMenu(details.text);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Main Menu */}

      <Box sx={{ overflow: 'auto', p: 2 }}>
        <Search width={drawerWidth} />
        <List>
          <Typography sx={{ m: 1, fontFamily: typography.fontFamily }}>
            Main Menu
          </Typography>
          {menuButtons.map((details, index) => (
            <ListItem
              key={details.text}
              disablePadding
              sx={{ px: 0, mb: 1 }}
              onClick={(e) => {
                handleMenuClick(e, details);
              }}
            >
              <ListItemMenuButton
                selected={selectedMenu === details.text ? true : false}
              >
                <Box
                  sx={{
                    //  bgcolor: palette.acapulco.main,
                    pr: 1,
                    width: 24,
                    height: 24,
                    m: 0.5,
                  }}
                  display={'flex'}
                  flex={'column'}
                  justifyItems={'center'}
                >
                  {<details.icon color={palette.blackPearl.main} />}
                </Box>
                <ListItemText
                  primary={details.text}
                  sx={{ color: palette.blackPearl.main }}
                />
              </ListItemMenuButton>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={{
            bgcolor: palette.blackPearl.main,
            opacity: 0.3,
          }}
        />
        <ListItemMenuButton sx={{}}>
          <Typography>Workspaces</Typography>

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
            {<PlusIcon color={palette.blackPearl.main} />}
          </Box>
        </ListItemMenuButton>
        <NestedList />
        <NestedList />
      </Box>
    </Drawer>
  );
}
