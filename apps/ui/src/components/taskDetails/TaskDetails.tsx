import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Divider,
  ImageListItem,
  SxProps,
  Typography,
} from '@mui/material';
import React from 'react';
import { Comment } from '../Comment';
import { AddComment } from '../AddComment';
import { BsClock } from 'react-icons/bs';
import { StyledButton } from '../StyledButton';
import { Image, Opacity } from '@mui/icons-material';
import { Tag } from '../Tag';
import { AvatarGroupDisplay } from '../AvatarGroupDisplay';
import { TitleAndButton } from '../TitleAndButton';
import { TaskRightSection } from './TaskRightSection';
import { SxPropsObject } from '../../utils/SxPropsObject';
import { time } from 'console';

const description =
  ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. ';

const title = 'Design a new logo for the company';

export function TaskDetails({ task }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '45vw',
        width: '100%',
        p: 4,
        borderRadius: '1rem',
        // bgcolor: (theme) => theme.palette.acapulco.main,
      }}
    >
      {/*  -----------------------------------------  LEFT-SECTION ------------------------------------------- */}

      <Box
        sx={{
          // display: 'flex',
          // flexDirection: 'row',
          height: '100%',
          width: '50%',
          px: 1,
          //   bgcolor: (theme) => theme.palette.acapulco.main,
        }}
      >
        {/* <h1>{task.title}</h1> */}
        <TaskHeader />
        {/* ------------------ TASK DETAILS ----------------*/}
        <Box
          sx={{
            overflow: 'hidden',
            overflowY: 'auto',
            width: '100%',
            height: '95%',
            my: 1,
          }}
        >
          <TextSection label={title} disableButton />
          <TextSection label={'Description'} text={description} />
          <ImageSection />
          <Deadline />
          <AssignedTo />
          <Tags />
        </Box>
      </Box>
      <Divider orientation="vertical" />
      {/*  -----------------------------------------  RIGHT-SECTION ------------------------------------------- */}

      <TaskRightSection />
    </Card>
  );
}

function TextSection({ label, text, disableButton }) {
  return (
    <>
      <TitleAndButton
        sectionName={label}
        ButtonText="Edit"
        disableButton={disableButton}
      />
      <Typography
        sx={{
          fontSize: '80%',
          mt: 1,
        }}
      >
        {text}
      </Typography>
    </>
  );
}

function Deadline(props) {
  const styles: SxPropsObject = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      bgcolor: '#F2F4F7',
      height: '5rem',
      width: '100%',
      p: 1,
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    timeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      gap: 1,
      // alignItems: 'center',
    },
    day: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textTransform: 'uppercase',

      alignItems: 'center',
      width: '3rem',
      height: '4rem',
      borderRadius: '1.5rem',
      bgcolor: '#E5E7EB',
    },
    tag: {
      bgcolor: (theme) => theme.palette.shadowGreen.main,
      color: (theme) => theme.palette.blackPearl.main,
    },
  };
  return (
    <>
      {' '}
      <TitleAndButton sectionName="Deadline" ButtonText="Edit" />
      <Box sx={styles.wrapper}>
        <Box sx={styles.content}>
          <Box sx={styles.timeWrapper}>
            <Box sx={styles.day}>
              <Typography sx={{ fontWeight: 'medium' }}>jan</Typography>
              <Typography sx={{ fontWeight: 'medium' }}>31</Typography>
            </Box>
            <Typography
              sx={{
                mt: 1,
              }}
            >
              2024
            </Typography>
          </Box>

          <Tag sx={styles.tag}>Pending</Tag>
        </Box>
      </Box>
    </>
  );
}

function AssignedTo(props) {
  return (
    <>
      <TitleAndButton sectionName="Assigned To" ButtonText="Edit" />
      <AvatarGroupDisplay
        avatars={[
          {
            name: 'John',
            src: 'https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg',
          },
          {
            name: 'John',
            src: 'https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg',
          },
          {
            name: 'John',
            src: 'https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg',
          },
          {
            name: 'John',
            src: 'https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg',
          },
          {
            name: 'John',
            src: 'https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg',
          },
          {
            name: 'John',
            src: 'https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg',
          },
        ]}
      />
    </>
  );
}

function Tags(props) {
  return (
    <>
      <TitleAndButton sectionName="Tags" ButtonText="Edit" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {[
          '#Design',
          '#UI',
          '#UX',
          '#Figma',
          '#AdobeXD',
          '#Sketch',
          '#Wireframes',
          '#Prototyping',
        ].map((tag) => (
          <Tag
            sx={{
              bgcolor: (theme) => theme.palette.shadowGreen.main,
              color: (theme) => theme.palette.blackPearl.main,
            }}
          >
            {tag}
          </Tag>
        ))}
      </Box>
    </>
  );
}

function ImageSection(props) {
  return (
    <ImageListItem
      sx={{
        mt: 1,
      }}
    >
      <img
        style={{
          borderRadius: '0.3rem',
          height: '10rem',
        }}
        src="https://static.vecteezy.com/system/resources/thumbnails/023/140/077/small_2x/3d-white-jewelry-flowers-wallpaper-with-golden-branches-and-butterflies-ai-generated-photo.jpg"
        alt="Task background"
      />
    </ImageListItem>
  );
}

function TaskHeader(props) {
  const styles: SxPropsObject = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
    },
    avatar: {
      bgcolor: (theme) => theme.palette.acapulco.main,
      width: '2.5rem',
      height: '2.5rem',
      fontSize: '140%',
    },
    rightBox: {
      display: 'flex',
      flexDirection: 'column',
      ml: 1,
    },
    action: {
      fontWeight: 'medium',
      fontSize: '80%',
    },
    timeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      gap: 1,
      alignItems: 'center',
    },
  };

  return (
    <Box sx={styles.wrapper}>
      <Avatar
        src="https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg"
        sx={styles.avatar}
      ></Avatar>
      <Box sx={styles.rightBox}>
        <Typography sx={styles.action}>
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            John{' '}
          </span>
          updated this task
        </Typography>
        <Box sx={styles.timeWrapper}>
          <BsClock />
          <Typography sx={{ fontSize: '80%' }}>3 hours ago </Typography>
        </Box>
      </Box>
    </Box>
  );
}
