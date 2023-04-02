import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import KeyIcon from '@mui/icons-material/Key';

import DiscordOAuthConfig from '@/interfaces/discordOAuthConfig';
import useDiscord from '@/hooks/useDiscord';
import useCookie from '@/hooks/useCookie';
import FeatureMenuCard from '@/components/menu/FeatureMenuCard';

type Props = {
  discordOAuthConfig: DiscordOAuthConfig;
};

const FeatureMenu: FC<Props> = ({ discordOAuthConfig }) => {
  const { login: discordLogin } = useDiscord(discordOAuthConfig);
  const { token } = useCookie();

  return (
    <Box
      sx={{
        my: 10,
        backgroundColor: '#35363A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '600px',
      }}
    >
      <Typography variant="h3" component="h3" my={8}>
        Feature Menu
      </Typography>
      <Box
        sx={{
          width: '80%',
        }}
      >
        <FeatureMenuCard
          title="Auth Feature"
          actions={[
            {
              key: 'discord-login',
              text: 'Discord Login',
              startIcon: <AssignmentIndIcon />,
              onClick: discordLogin,
            },
            {
              key: 'get-token-in-cookie',
              text: 'Get Token in Cookie',
              startIcon: <KeyIcon />,
              onClick: () => alert(token.get()),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default FeatureMenu;
