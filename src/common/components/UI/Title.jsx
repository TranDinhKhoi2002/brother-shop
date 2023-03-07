import { Typography } from '@mui/material';

function Title({ children, sx }) {
  return (
    <Typography variant="h5" sx={{ lineHeight: '2rem', fontWeight: 500, textTransform: 'uppercase', ...sx }}>
      {children}
    </Typography>
  );
}

export default Title;
