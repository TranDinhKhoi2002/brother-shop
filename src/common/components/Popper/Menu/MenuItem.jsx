import { Box } from '@mui/material';
import { useTheme } from '@mui/styles';
import Link from 'next/link';

function MenuItem({ title, path }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 1,
        px: '20px',
        color: theme.palette.grey['200'],
        ':hover': {
          backgroundColor: theme.palette.grey['200'],
          color: theme.palette.grey['800'],
        },
      }}
    >
      <Link href={{ pathname: path, query: { title, types: title } }} style={{ display: 'block' }}>
        {title}
      </Link>
    </Box>
  );
}

export default MenuItem;
