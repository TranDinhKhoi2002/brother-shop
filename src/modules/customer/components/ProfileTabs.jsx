import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Divider, Grid, Stack } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountInfoTab from './tabs/AccountInfoTab';
import PurchaseHistoryTab from './tabs/PurchaseHistoryTab';
import AddressesTab from './tabs/AddressesTab';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout, selectCurrentUser } from '@/redux/slices/auth';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import config from '@/config';
import PromotionsTab from './tabs/PromotionsTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ProfileTabs() {
  const [value, setValue] = React.useState(0);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(assignProductsToWishlist({ products: [] }));
    router.replace(config.routes.login);
  };

  return (
    <Container maxWidth="xxl">
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <PersonOutlineOutlinedIcon />
        <Typography variant="h4">Tài khoản của bạn</Typography>
      </Stack>
      <Grid container sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
        <Grid item xs={12} md={3}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ borderWidth: 1, borderColor: 'divider', py: 2 }}
          >
            <Tab label="Thông tin tài khoản" {...a11yProps(0)} sx={{ px: 6, alignItems: 'flex-start' }} />
            <Tab label="Lịch sử mua hàng" {...a11yProps(1)} sx={{ px: 6, alignItems: 'flex-start' }} />
            <Tab label="Địa chỉ giao hàng" {...a11yProps(2)} sx={{ px: 6, alignItems: 'flex-start' }} />
            <Tab label="Ưu đãi của bạn" {...a11yProps(3)} sx={{ px: 6, alignItems: 'flex-start' }} />
            <Divider />
            <Typography sx={{ px: 6, pt: 2, fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogout}>
              <LogoutIcon /> Đăng xuất
            </Typography>
          </Tabs>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <TabPanel value={value} index={0}>
              <AccountInfoTab currentUser={currentUser} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PurchaseHistoryTab orders={currentUser?.orders} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <AddressesTab addresses={currentUser?.address} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PromotionsTab promotions={currentUser?.promotions} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
