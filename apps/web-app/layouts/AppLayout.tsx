import { Box, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        height: 1,
      }}
    >
      <Typography>With Layout</Typography>
      {children}
    </Box>
  );
};

export default AppLayout;
