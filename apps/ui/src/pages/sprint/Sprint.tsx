import { styled } from '@mui/material/styles';
import { Box, Button, Card, Paper, Typography } from '@mui/material';
import { SprintSettings, SprintsList, TimeLeft } from './components';
import { StyledButton } from '../../components';
import { SxPropsObject } from '../../utils/sxPropsObject';
import {
  HalfCircleProgress,
  SemiCircleProgress,
} from '../../components/SemiCircleProgress/SemiCircleProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Sprint = () => {
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
  return (
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
        <Typography sx={styles.title}>Welcome back, Anika</Typography>
        <Typography sx={styles.subTitle}>
          Nice progress so far, keep it up!
        </Typography>
      </Box>
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
          You have used 80% of your available spots. Upgrade plan to create more
          projects.{' '}
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
    </Box>
  );
};

export { Sprint };
