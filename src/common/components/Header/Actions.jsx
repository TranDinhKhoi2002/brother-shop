import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import config from '@/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Badge, Button, IconButton, Stack, Tooltip } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import AccountPopper from './AccountPopper';
import { selectCartProducts } from '@/redux/slices/cart';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { selectWishlistProducts } from '@/redux/slices/wishlist';

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

function Actions({ openSearch, showSideBar, showCartPreview, showWishlist }) {
  const cartProducts = useSelector(selectCartProducts);
  const wishlistProducts = useSelector(selectWishlistProducts);

  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const theme = useTheme();
  const styles = useStyles();

  const authHandler = () => {
    if (!isAuthenticated) {
      router.push(config.routes.login);
    }
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Tooltip title="Tìm kiếm sản phẩm">
        <IconButton className={styles.actionItem} onClick={openSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      {isAuthenticated ? (
        <AccountPopper />
      ) : (
        <Tooltip title="Tài khoản">
          <IconButton className={styles.actionItem} onClick={authHandler}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Danh sách yêu thích">
        <IconButton className={styles.actionItem} onClick={showWishlist}>
          <Badge badgeContent={wishlistProducts.length} color="info">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Giỏ hàng">
        <IconButton className={styles.actionItem} onClick={showCartPreview}>
          <Badge badgeContent={cartProducts.length} color="info">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Button
        onClick={showSideBar}
        sx={{ ...styles, color: theme.palette.grey['200'], display: { xs: 'block', lg: 'none' } }}
      >
        <MenuIcon sx={{ fontSize: '30px' }} />
      </Button>
    </Stack>
  );
}

export default Actions;
