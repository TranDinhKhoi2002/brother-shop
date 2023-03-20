import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SearchInput from './SearchInput';
import MainNavigation from './MainNavigation';
import Actions from './Actions';
import config from '@/config';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.grey['900'],
    height: '80px',
    paddingLeft: '12%',
    [theme.breakpoints.up('600')]: {
      paddingLeft: '10%',
    },
    paddingRight: '12%',
    [theme.breakpoints.up('600')]: {
      paddingRight: '10%',
    },
  },
}));

const Header = ({ showSideBar, showCartPreview }) => {
  const [search, setSearch] = useState(false);
  const styles = useStyles();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading....</p>;
  }

  function openSearchHandler() {
    setSearch(true);
  }

  function closeSearchHandler() {
    setSearch(false);
  }

  if (search) {
    return <SearchInput className={styles.header} closeSearch={closeSearchHandler} />;
  }

  return (
    <Box component="header" className={styles.header}>
      <Box>
        <Link href={config.routes.home}>
          <Image
            className="w-16 h-11 align-middle"
            src="https://res.yame.vn/Content/images/yame-f-logo-white.png"
            width={300}
            height={300}
            alt=""
          />
        </Link>
      </Box>
      <MainNavigation />
      <Actions openSearch={openSearchHandler} showSideBar={showSideBar} showCartPewview={showCartPreview} />
    </Box>
  );
};

export default Header;
