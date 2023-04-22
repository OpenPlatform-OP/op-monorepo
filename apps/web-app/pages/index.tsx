import { ReactElement } from 'react';
import { Container } from '@mui/material';
import FeatureMenu from '@/containers/menu/FeatureMenu';

const Index = () => {
  return (
    <Container fixed>
      <FeatureMenu />
    </Container>
  );
};

Index.getMainLayout = (page: ReactElement) => page;

export default Index;
