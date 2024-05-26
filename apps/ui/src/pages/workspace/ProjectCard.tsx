import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const { workspaceId } = useParams();
  const createdAt = new Date(project.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`project/${project.id}`)}
      sx={{
        '--border-radius': '0.75rem',
        '--primary-color': '#7257fa',
        '--secondary-color': '#3c3852',
        width: '23.5%',
        fontFamily: 'Arial',
        padding: '1rem',
        cursor: 'pointer',
        borderRadius: 'var(--border-radius)',
        background: '#f1f1f3',
        boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.03)',
        position: 'relative',
        height: '10rem',
        '& > * + *': {
          //   marginTop: '1.1em',
        },
        '& .card__content': {
          color: 'var(--secondary-color)',
          fontSize: '0.86rem',
          //   maxHeight: '3.5rem',
        },
        '& .card__title': {
          padding: 0,
          fontSize: '1.3rem',
          fontWeight: 'bold',
        },
        '& .card__date': {
          color: '#6e6b80',
          fontSize: '0.8rem',
        },
        '& .card__arrow': {
          position: 'absolute',
          background: 'var(--primary-color)',
          height: '2rem',
          padding: '0.4rem',
          borderTopLeftRadius: 'var(--border-radius)',
          borderBottomRightRadius: 'var(--border-radius)',
          bottom: 0,
          right: 0,
          transition: '0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: (theme) => theme.palette.shadowGreen.main,
          '&:hover': {
            bgcolor: (theme) => theme.palette.primary.main,
          },
          '& svg': {
            transition: '0.2s',
          },
        },
        '&:hover .card__title': {
          color: (theme) => theme.palette.bismark.main,
          textDecoration: 'underline',
        },
        '&:hover .card__arrow svg': {
          transform: 'translateX(3px)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h3" className="card__title">
          {project.name}
        </Typography>
        <Typography className="card__content">{project.description}</Typography>
        <Typography className="card__date">{createdAt}</Typography>
      </CardContent>
      <div className="card__arrow">
        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default ProjectCard;
