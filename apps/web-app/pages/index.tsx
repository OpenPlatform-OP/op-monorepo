import { Box, Button, Link, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { NextPageWithProps } from './_app';

const Index: NextPageWithProps = () => {
  return (
    <Box>
      <Button>
        <Link href="/home">
          <Typography variant="h2">Home Page</Typography>
        </Link>
      </Button>
    </Box>
  );
};

Index.getMainLayout = (page: ReactElement) => page;

export default Index;
