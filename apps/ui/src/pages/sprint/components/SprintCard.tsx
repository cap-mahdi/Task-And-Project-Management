import { Box, Card, Divider, Typography } from '@mui/material';
import React from 'react';
import { SxPropsObject } from '../../../utils/sxPropsObject';
import { WiTime4 } from 'react-icons/wi';
import { theme } from '../../../theme';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { MdAlarmOn } from 'react-icons/md';

export default function SprintCard(props) {
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
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        borderRadius: 2,
        boxShadow: ' 0px 2px 3px rgba(0, 0, 0, 0.4)',
        gap: 1,
        width: '30%',
      }}
    >
      <Box
        sx={{
          paddingTop: 3,
          paddingBottom: 2,
          px: 3,
        }}
      >
        <Typography sx={styles.title}>Sprint Name</Typography>
        <Typography sx={styles.subTitle}>
          This is a description for the sprint{' '}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <WiTime4
            style={{
              fontSize: '1.5rem',
              color: 'grey',
            }}
          />
          <Typography sx={styles.subTitle}>
            {new Date().toLocaleDateString('en-US', {
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
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
        </Box>
      </Box>
      <HorizontalProgressBar value={20} />
      <Link
        to={'sprint/5'}
        style={{
          textDecoration: 'none',
          color: 'black',
        }}
      >
        <Box
          sx={{
            py: 1,
            px: 1,
            display: 'flex',
            gap: '0.3rem',
            justifyContent: 'flex-end',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Typography sx={styles.subTitle}>See More</Typography>
          <IoIosArrowRoundForward
            style={{
              fontSize: '1.5rem',
              color: 'grey',
            }}
          />
        </Box>
      </Link>
    </Card>
  );
}

const HorizontalProgressBar = ({ value, max = 100 }) => {
  // Calculate the width of the progress bar
  const progressWidth = (value / max) * 100 + '%';

  return (
    <Box
      sx={{
        width: '100%',
        height: '3px',
        backgroundColor: '#EBEEFE',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
        // borderRadius: '1rem',
      }}
    >
      <Box
        sx={{
          width: progressWidth,
          height: '100%',
          backgroundColor: (theme) => theme.palette.bismark.main,
          // borderRadius: '1rem',
        }}
      />
    </Box>
  );
};
