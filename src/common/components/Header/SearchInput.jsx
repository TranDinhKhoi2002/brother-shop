import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/styles';
import config from '@/config';

function SearchInput(props) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const theme = useTheme();

  const inputChangeHandler = (e) => {
    const searchInputValue = e.target.value;

    if (!searchInputValue.startsWith(' ')) {
      setSearchValue(searchInputValue);
    }
  };

  const searchHandler = (e) => {
    if (!searchValue) return;

    if (e.key === 'Enter') {
      router.push({ pathname: config.routes.search, query: { keyword: searchValue } });
      props.closeSearch();
    }
  };

  return (
    <Box className={`${props.className} !bg-white`}>
      <input
        className="w-[95%] border-none outline-none text-xl lg:text-[40px]"
        autoFocus
        value={searchValue}
        onChange={inputChangeHandler}
        placeholder="Nhập sản phẩm cần tìm"
        spellCheck={false}
        onKeyUp={searchHandler}
      />
      <IconButton onClick={props.closeSearch}>
        <CloseIcon
          sx={{
            fontSize: '30px',
            color: theme.palette.grey[600],
            transition: 'all linear 300ms',
            ':hover': { opacity: 0.6 },
          }}
        />
      </IconButton>
    </Box>
  );
}

export default SearchInput;
