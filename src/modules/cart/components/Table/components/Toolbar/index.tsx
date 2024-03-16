import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { MouseEventHandler, ReactElement } from 'react';

type CartTableToolbarProps = {
  numSelected: number;
  onDelete: MouseEventHandler<HTMLButtonElement>;
};

function CartTableToolbar({ numSelected, onDelete }: CartTableToolbarProps): ReactElement {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.dark, theme.palette.action.hoverOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} đã chọn
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%', fontWeight: 500 }} variant="h6" id="tableTitle" component="div">
          Giỏ hàng của bạn
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

CartTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default CartTableToolbar;
