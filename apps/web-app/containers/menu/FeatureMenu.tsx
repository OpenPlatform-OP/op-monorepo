import { FC } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';

import FeatureMenuCard from '@/components/menu/FeatureMenuCard';
import useDiscord from '@/hooks/useDiscord';
import useAuth from '@/hooks/useAuth';
import useAuthCtx from '@/hooks/context/useAuth';

const FeatureMenu: FC = () => {
  const { getDiscordOAuthEndpoint } = useDiscord();
  const { userInfo } = useAuthCtx();
  const { signOut } = useAuth();

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
          title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              Auth Feature
              {userInfo && (
                <Tooltip
                  title={userInfo.userName}
                  placement="top"
                  sx={{ ml: 5, cursor: 'pointer' }}
                >
                  <Avatar alt="Avatar" src={userInfo.avatar} />
                </Tooltip>
              )}
            </Box>
          }
          actions={[
            {
              key: 'discord-login',
              text: 'Discord Login',
              startIcon: <AssignmentIndIcon />,
              onClick: getDiscordOAuthEndpoint,
              variant: 'contained',
              disabled: userInfo !== null && userInfo !== undefined,
            },
            {
              key: 'logout',
              text: 'Logout',
              startIcon: <LogoutIcon />,
              onClick: signOut,
              variant: 'contained',
              disabled: !(userInfo !== null && userInfo !== undefined),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default FeatureMenu;
