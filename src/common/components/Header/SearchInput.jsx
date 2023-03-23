import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/router';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/styles';

function SearchInput(props) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const theme = useTheme();

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.push({ pathname: '/search', query: { keyword: debouncedValue } });
      props.closeSearch();
    }
  }, [debouncedValue, router, props]);

  const inputChangeHandler = (e) => {
    const searchInputValue = e.target.value;

    if (!searchInputValue.startsWith(' ')) {
      setSearchValue(searchInputValue);
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
