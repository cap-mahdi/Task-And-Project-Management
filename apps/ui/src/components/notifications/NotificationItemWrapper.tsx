import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const NotificationItemWrapper = ({ children, bgColor, onClick }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'primary.light',
        },
        backgroundColor: bgColor,
      }}
      onDoubleClick={onClick}
    >
      {children}
    </Box>
  );
};

NotificationItemWrapper.propTypes = {
  children: PropTypes.node,
};

export { NotificationItemWrapper };
