import { ReactElement } from 'react';
import { GetServerSidePropsResult } from 'next';
import { Container } from '@mui/material';
import { NextPageWithProps } from './_app';
import DiscordOAuthConfig from '@/interfaces/discordOAuthConfig';
import getDiscordOAuthConfig from '@/utils/discord';
import FeatureMenu from '@/containers/menu/FeatureMenu';

type ServerSideProps = {
  discordOAuthConfig: DiscordOAuthConfig;
};

const Index: NextPageWithProps<ServerSideProps> = ({ discordOAuthConfig }) => {
  return (
    <Container fixed>
      <FeatureMenu discordOAuthConfig={discordOAuthConfig} />
    </Container>
  );
};

Index.getMainLayout = (page: ReactElement) => page;

export const getServerSideProps =
  (): GetServerSidePropsResult<ServerSideProps> => {
    return {
      props: {
        discordOAuthConfig: getDiscordOAuthConfig(),
      },
    };
  };

export default Index;
