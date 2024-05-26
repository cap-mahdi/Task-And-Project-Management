import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@mui/material';
import Search from './Search';
import { ListItemMenuButton } from './ListItemMenuButton';
import { menuButtons } from './menuButtonsData';
import { NestedList } from './NestedList';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { FetchWorkspaceRequest } from '../../services/workspace/workspaceQueries';
import { v4 as uuidv4 } from 'uuid';
import { AddWorkspace } from '../AddWorkspace';

const drawerWidth = 270;

export function SideBar({ toolbarSize }) {
  const theme = useTheme();
  const { palette, typography } = theme;

  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [loadWorkspace, workspaceItems] = useCustomLazyQuery(
    FetchWorkspaceRequest([
      'id',
      'name',
      'description',
      'projects{ id, name }',
    ]),
    true
  );
  const workspaceRef = useRef(null);

  useEffect(() => {
    loadWorkspace();
  }, []);

  const handleMenuClick = (e: MouseEvent, details: any) => {
    setSelectedMenu(details.text);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          position: 'relative',
          width: drawerWidth,
          flexShrink: 0,
          // position: 'sticky',
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            // position: 'relative' ,
          },
        }}
      >
        {/* Main Menu */}
        <Toolbar sx={{ height: toolbarSize }} />
        <Box
          sx={{
            overflow: 'auto',
            p: 2,
            '&::-webkit-scrollbar': {
              display: 'none', // Hide the scrollbar in WebKit browsers
            },
          }}
        >
          <Search width={drawerWidth} />
          <List>
            <Typography sx={{ m: 1, fontFamily: typography.fontFamily }}>
              Main Menu
            </Typography>
            {menuButtons.map((details, index) => (
              <Link
                to={details.link}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                key={details.text}
              >
                <ListItem
                  key={details.text}
                  disablePadding
                  sx={{ px: 0, mb: 1 }}
                  onClick={(e) => {
                    handleMenuClick(e, details);
                    if (details?.onClick) details?.onClick();
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
              </Link>
            ))}
          </List>
          <Divider
            sx={{
              bgcolor: palette.blackPearl.main,
              opacity: 0.3,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 1,
              py: 0.5,
              mb: 1,
            }}
          >
            <Typography sx={{ fontFamily: typography.fontFamily }}>
              Workspaces
            </Typography>
            <Box
              sx={{
                width: 25,
                height: 25,
                fontWeight: '700',
                cursor: 'pointer',
              }}
              display={'flex'}
              flex={'column'}
              justifyItems={'center'}
              onClick={() => {
                workspaceRef.current?.setOpen(true);
              }}
            >
              {<PlusIcon color={palette.blackPearl.main} />}
            </Box>
          </Box>
          {workspaceItems?.data
            ? workspaceItems?.data?.workspaces?.map((workspace: any) => {
                return <NestedList data={workspace} key={uuidv4()} />;
              })
            : ''}
        </Box>
      </Drawer>
      <AddWorkspace ref={workspaceRef} />
    </>
  );
}
