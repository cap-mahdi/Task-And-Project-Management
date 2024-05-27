import Container from '@mui/material/Container';
import { Summary, TrafficSource, VisitByCountry } from './components';
import { Box, Card, Grid, Typography } from '@mui/material';
import useAppContext from '../../context/useAppContext';
import { Link } from 'react-router-dom';

const Overview = () => {
  const [globalState] = useAppContext();
  return (
    // <Container maxWidth="xl">
    //   <Grid container spacing={3}>
    //     <Grid xs={12} sm={6} md={4}>
    //       <Summary
    //         title="Weekly Sales"
    //         total={714000}
    //         color="success"
    //         icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
    //       />
    //     </Grid>
    //     <Grid xs={12} sm={6} md={4}>
    //       <Summary
    //         title="Weekly Sales"
    //         total={714000}
    //         color="success"
    //         icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
    //       />
    //     </Grid>
    //     <Grid xs={12} sm={6} md={4}>
    //       <Summary
    //         title="Weekly Sales"
    //         total={714000}
    //         color="success"
    //         icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
    //       />
    //     </Grid>
    //     <Grid xs={12} md={6} lg={8}>
    //       <TrafficSource
    //         title="Website Visits"
    //         subheader="(+43%) than last year"
    //       />
    //     </Grid>
    //     <Grid xs={12} md={6} lg={4}>
    //       <VisitByCountry
    //         title="Conversion Rates"
    //         subheader="(+43%) than last year"
    //       />
    //     </Grid>
    //     <Grid xs={12} md={6} lg={8}>
    //       <TrafficSource
    //         title="Website Visits"
    //         subheader="(+43%) than last year"
    //       />
    //     </Grid>
    //     <Grid xs={12} md={6} lg={4}>
    //       <VisitByCountry
    //         title="Conversion Rates"
    //         subheader="(+43%) than last year"
    //       />
    //     </Grid>
    //   </Grid>
    // </Container>
    <Box
      sx={{
        py: 2,
        px: 3,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Welcome Back, {globalState?.user?.name}{' '}
        </Typography>
        <Typography
          sx={{
            color: 'gray',
          }}
        >
          Nice progress so far, keep it up!
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'medium',
          my: '0.8rem',
        }}
      >
        Workspaces
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '1.5%',
          justifyContent: 'flex-start',
          rowGap: '1.5rem',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {globalState?.workspaces.map((workspace) => (
          <Link
            style={{
              textDecoration: 'none',
              color: 'black',
              width: '18.5%',
            }}
            to={`workspace/${workspace.id}`}
          >
            {/* <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'justify-center',

                borderRadius: 2,
                boxShadow: ' 0px 2px 3px rgba(0, 0, 0, 0.4)',
                gap: 1,

                width: '100%',
                height: '10rem',
              }}
            >
              <Typography>{workspace.name}</Typography>
            </Card> */}
            <WorkspaceCard name={workspace.name} />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const WorkspaceCard = ({ name }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 220,
        height: 220,
        backgroundColor: (theme) => theme.palette.shadowGreen.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        borderRadius: 2,
        cursor: 'pointer',
        '&::before, &::after': {
          position: 'absolute',
          content: '""',
          width: '20%',
          height: '20%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (theme) => theme.palette.blackPearl.main,
          transition: 'all 0.5s',
        },
        '&::before': {
          top: 0,
          right: 0,
          borderRadius: '0 15px 0 100%',
        },
        '&::after': {
          bottom: 0,
          left: 0,
          borderRadius: '0 100% 0 15px',
        },
        '&:hover::before, &:hover::after': {
          color: (theme) => theme.palette.albescentWhite.main,
          width: '100%',
          height: '100%',
          borderRadius: 2,
          transition: 'all 0.5s',
        },
        '&:hover::after': {
          content: '"Access"',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 25,
          fontWeight: 'bold',
        },
      }}
    >
      {name}
    </Box>
  );
};

export { Overview };
