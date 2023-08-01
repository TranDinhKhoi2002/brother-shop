import { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from './SearchInput';
import MainNavigation from './MainNavigation';
import Actions from './Actions';
import config from '@/config';
import { Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { appAssets } from '@/common/assets';
import BackdropLoading from '../Loading/BackdropLoading';

const useStyles = makeStyles((theme: Theme) => ({
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
    paddingLeft: '5%',
    paddingRight: '5%',
  },
}));

type HeaderProps = {
  showSideBar: MouseEventHandler<HTMLButtonElement>;
  showCartPreview: MouseEventHandler<HTMLButtonElement>;
  showWishlist: MouseEventHandler<HTMLButtonElement>;
};

const Header = ({ showSideBar, showCartPreview, showWishlist }: HeaderProps): ReactElement => {
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const styles = useStyles();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  function openSearchHandler() {
    setSearchMode(true);
  }

  function closeSearchHandler() {
    setSearchMode(false);
  }

  if (searchMode) {
    return <SearchInput className={styles.header} closeSearch={closeSearchHandler} />;
  }

  return (
    <Box component="header" className={styles.header}>
      <Box>
        <Link href={config.routes.home}>
          <Image className="w-16 h-16 align-middle" src={appAssets.logo} width={1000} height={1000} alt="" />
        </Link>
      </Box>
      <MainNavigation />
      <Actions
        openSearch={openSearchHandler}
        showSideBar={showSideBar}
        showCartPreview={showCartPreview}
        showWishlist={showWishlist}
      />
    </Box>
  );
};

export default Header;