import { styled } from '@mui/material/styles';
import { Box, Button, Card, Divider, Paper, Typography } from '@mui/material';
import { SprintSettings, SprintsList, TimeLeft } from './components';
import { StyledButton } from '../../components';
import { SxPropsObject } from '../../utils/sxPropsObject';
import {
  HalfCircleProgress,
  SemiCircleProgress,
} from '../../components/SemiCircleProgress/SemiCircleProgress';

import { MdOutlinePostAdd } from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';
import useAppContext from '../../context/useAppContext';
import SprintCard from './components/SprintCard';
import { useNavigate, useParams } from 'react-router-dom';
import { AddSprint } from '../../components/AddSprint';
import { useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MILESTONES } from '../../services/milestone/milestoneQueries';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Sprints = () => {
  const [globalState] = useAppContext();
  const { projectId } = useParams();
  const styles: SxPropsObject = {
    title: {
      fontWeight: 'bold',
      fontSize: '0.8rem',
    },

    subTitle: {
      fontSize: '0.7rem',
      color: (theme) => theme.palette.text.secondary,
    },
  };
  const sprintRef = useRef(null);

  const [loadSprints, sprintItems] = useCustomLazyQuery(GET_MILESTONES, false);
  useEffect(() => {
    if (projectId)
      loadSprints({
        variables: {
          projectId,
        },
      });
  }, [projectId, loadSprints, globalState.events['CREATE_MILESTONE']]);
  return (
    <>
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <Box>
          <Typography sx={styles.title}>
            Welcome back, {globalState.user?.name}
          </Typography>
          <Typography sx={styles.subTitle}>
            Nice progress so far, keep it up!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              py: 1,
              px: 3,
              borderRadius: 2,
              boxShadow: ' 0px 4px 8px rgba(0, 0, 0, 0.25)',
              gap: 1,
              width: '100%',
            }}
          >
            <SemiCircleProgress
              percentage={20}
              size={{
                width: 200,
                height: 100,
              }}
              strokeWidth={10}
              strokeColor="#468189"
              hasBackground={true}
              bgStrokeColor="#EBEEFE"
            />
            <Typography sx={styles.title}>
              Not so much time left on this sprint. Keep Going
            </Typography>
            <Typography sx={styles.subTitle}>
              You have used 80% of your available spots. Upgrade plan to create
              more projects.{' '}
            </Typography>
            <StyledButton
              sx={{
                width: '15rem',
                borderRadius: '0.5rem',
              }}
            >
              Continue: Sprint Name
            </StyledButton>
          </Card>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              py: 2,
              px: 2,
              borderRadius: 2.5,
              border: 'solid 2px #6C737F22',

              boxShadow: ' none',
              gap: 1,
              // width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                height: '50%',
                // bgcolor: 'red',
              }}
            >
              <MdOutlinePostAdd
                style={{
                  fontSize: '2rem',
                  // color: '#6C737F',
                  marginRight: '1rem',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                Manage your sprint settings
                <StyledButton
                  onClick={() => sprintRef?.current?.setOpen(true)}
                  sx={{
                    marginTop: '0.5rem',
                    height: '2rem',
                  }}
                >
                  Add Sprint{' '}
                </StyledButton>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                height: '50%',
                // bgcolor: 'red',
              }}
            >
              <BsPersonFillAdd
                style={{
                  fontSize: '2rem',
                  // color: '#6C737F',
                  marginRight: '1rem',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                Add members to this project
                <StyledButton
                  sx={{
                    marginTop: '0.5rem',
                    height: '2rem',
                  }}
                >
                  Add Member
                </StyledButton>
              </Box>
            </Box>
          </Card>
        </Box>
        <Box
          sx={{
            marginTop: '1rem',
          }}
        >
          <Typography sx={styles.title}>Milestones</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '2%',
            rowGap: '1rem',
            flexWrap: 'wrap',
            justifyContent: '',
          }}
        >
          {sprintItems?.data?.milestones &&
            sprintItems?.data?.milestones.map((sprint: any) => (
              <SprintCard sprint={sprint} />
            ))}
        </Box>
      </Box>

      <AddSprint ref={sprintRef} />
    </>
  );
};

export { Sprints };
