import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  ButtonProps,
} from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  title?: string | ReactNode;
  actions: (ButtonProps & { key: string; text: string })[];
};

const FeatureMenuCard: FC<Props> = ({ title, actions }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: 'solid 1px transparent',
        borderRadius: '15px',
      }}
    >
      <CardContent>
        {title && (
          <>
            <Typography variant="h4" component="h4">
              {title}
            </Typography>
            <Divider
              sx={{
                mt: 2,
              }}
            />
          </>
        )}
        <Box m={5}>
          {actions.map(({ key, text, ...buttonProps }) => (
            <Button
              sx={{
                m: 3,
              }}
              key={key}
              {...buttonProps}
            >
              {text}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeatureMenuCard;
