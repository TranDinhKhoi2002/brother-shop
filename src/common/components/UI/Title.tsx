import { ReactElement, ReactNode } from 'react';
import { Typography, SxProps } from '@mui/material';

type TitleProps = {
  children: ReactNode;
  sx?: SxProps;
};

function Title({ children, sx }: TitleProps): ReactElement {
  return (
    <Typography variant="h5" sx={{ lineHeight: '2rem', fontWeight: 500, textTransform: 'uppercase', ...sx }}>
      {children}
    </Typography>
  );
}

export default Title;
