import { FC } from 'react';
import { styled } from '@mui/material/styles';
import MuiBadge, { BadgeProps, badgeClasses } from '@mui/material/Badge';

const CustomizedBadge = styled(MuiBadge)<BadgeProps>({
  [`.${badgeClasses.badge}`]: {
    overflow: 'hidden',
  },
  [`.${badgeClasses.badge}::before`]: {
    content: '""',
    position: 'absolute',
    display: 'inline-block',
    top: -24,
    left: 0,
    width: 8,
    height: '100%',
    backgroundColor: '#fff',
    animation: 'shiny 3s ease-in-out infinite',
  },
  '@keyframes shiny': {
    '0%': {
      transform: 'scale(0) rotate(45deg)',
      opacity: 0,
    },
    '80%': {
      transform: 'scale(0) rotate(45deg)',
      opacity: 0.5,
    },
    '81%': {
      transform: 'scale(4) rotate(45deg)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(50) rotate(45deg)',
      opacity: 0,
    },
  },
});

export const Badge: FC<BadgeProps> = (props) => {
  return <CustomizedBadge {...props} />;
};

export default Badge;
