import { Box, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';
import Link from 'next/link';
import { ReactElement } from 'react';

type MenuItemProps = {
  title?: string;
  path: string;
};

function MenuItem({ title, path }: MenuItemProps): ReactElement {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        py: 1,
        px: '26px',
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
