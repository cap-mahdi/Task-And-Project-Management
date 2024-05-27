import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import { SxPropsObject } from '../../../utils/sxPropsObject';
import useSprintContext from '../../../context/useSprintContext';
import { WiTime4 } from 'react-icons/wi';
import car from '../../../../public/car.png';

import { MdAlarmOn } from 'react-icons/md';
import Road from '../../../components/Road';
export function SprintOverview() {
  const [{ data: sprint }] = useSprintContext();
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
        paddingTop: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <Typography
        sx={{
          fontWeight: 'medium',
          fontSize: '1.2rem',
          marginBottom: '1rem',
        }}
      >
        {sprint?.description}
      </Typography>


      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          // padding: 2,
          width: '100%',
        }}
      >
        <Road />
        <TrackCard
          title={'10 Days Left 🚩'}
          subTitle={'Hurry up!  time is flying'}
          background={car}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginTop: '0.5rem',
            }}
          >
            <WiTime4
              style={{
                fontSize: '1.5rem',
                color: 'grey',
              }}
            />
            <Typography sx={styles.subTitle}>
              {new Date(sprint?.startDate).toLocaleDateString({
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>

            <MdAlarmOn
              style={{
                marginLeft: '1.5rem',
                fontSize: '1.4rem',
                color: 'grey',
              }}
            />
            <Typography sx={styles.subTitle}>
              {new Date(sprint?.endDate).toLocaleDateString({
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Typography>
          </Box>
        </TrackCard>
      </Box>
    </Box>
  );
}

function TrackCard({ title, subTitle, children, background }) {
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',

        gap: 1,

        background: `url(${background})`,
        objectFit: 'cover',
        width: '32rem',
        height: '10rem',
        paddingLeft: '6.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

          gap: 1,
        }}
      >
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.subTitle}>{subTitle}</Typography>
        {children}
      </Box>
    </Box>
  );
}
