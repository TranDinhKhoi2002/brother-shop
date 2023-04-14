import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { logout, setFacebookAccount, setGoogleAccount } from '@/redux/slices/auth';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  actionItem: {
    width: '1rem',
    lineHeight: '1rem',
    paddingLeft: '1rem',

    transition: 'all 300ms linear',
    '&:hover': { opacity: 0.6 },
    color: theme.palette.grey['200'],
  },
}));

const accountPopperItems = [
  { title: 'Thông tin tài khoản', path: '/profile' },
  { title: 'Lịch sử mua hàng', path: '/history' },
  { title: 'Đăng xuất' },
];

export default function ActionsPopper() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const styles = useStyles();
  const dispatch = useDispatch();

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(assignProductsToWishlist({ products: [] }));

    dispatch(setGoogleAccount({ user: undefined }));
    dispatch(setFacebookAccount({ user: undefined }));
    localStorage.removeItem('googleAccount');
    localStorage.removeItem('facebookAccount');
  };

  const handleGoToPath = (path) => {
    router.push(path);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 100 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                {accountPopperItems.map((item) => (
                  <ListItem
                    key={item.title}
                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#e6e6e6' } }}
                    onClick={item.title === 'Đăng xuất' ? handleLogout : () => handleGoToPath(item.path)}
                  >
                    <ListItemText>
                      <Typography sx={{ fontWeight: 400 }}>{item.title}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Tooltip title="Tài khoản">
        <IconButton className={styles.actionItem} onClick={handleClick}>
          <PersonIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
