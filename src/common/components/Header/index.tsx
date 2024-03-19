import { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InstantSearch } from 'react-instantsearch';
import { Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import config from '@/config';
import { appAssets } from '@/common/assets';
import { searchClient } from '@/utils/lib/algolia';
import SearchInput from './Search';
import MainNavigation from './MainNavigation';
import Actions from './Actions';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    position: 'relative',
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

const Header = ({ showSideBar, showCartPreview, showWishlist }: HeaderProps) => {
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const styles = useStyles();

  const handleToogleSearch = () => {
    setSearchMode(!searchMode);
  };

  if (searchMode) {
    return (
      <InstantSearch searchClient={searchClient} indexName="product" stalledSearchDelay={500}>
        <SearchInput className={styles.header} closeSearch={handleToogleSearch} />
      </InstantSearch>
    );
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
        openSearch={handleToogleSearch}
        showSideBar={showSideBar}
        showCartPreview={showCartPreview}
        showWishlist={showWishlist}
      />
    </Box>
  );
};

export default Header;
