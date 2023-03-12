import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@mui/styles';

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

export default function ActionsPopper() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 100 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                <ListItem sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#e6e6e6' } }}>
                  <ListItemText>Thông tin tài khoản</ListItemText>
                </ListItem>
                <ListItem sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#e6e6e6' } }}>
                  <ListItemText>Lịch sử mua hàng</ListItemText>
                </ListItem>
                <ListItem sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#e6e6e6' } }}>
                  <ListItemText>Đăng xuất</ListItemText>
                </ListItem>
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
