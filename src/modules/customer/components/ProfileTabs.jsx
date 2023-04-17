import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountInfo from './tabs/AccountInfo';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <PersonOutlineOutlinedIcon />
        <Typography variant="h4">Tài khoản của bạn</Typography>
      </Stack>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{ borderWidth: 1, borderColor: 'divider', py: 2 }}
        >
          <Tab label="Thông tin tài khoản" {...a11yProps(0)} sx={{ px: 6 }} />
          <Tab label="Lịch sử mua hàng" {...a11yProps(1)} />
          <Tab label="Địa chỉ mua hàng" {...a11yProps(2)} />
          <Tab label="Sản phẩm yêu thích" {...a11yProps(3)} />
        </Tabs>
        <Box sx={{ flex: 1 }}>
          <TabPanel value={value} index={0}>
            <AccountInfo />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}
