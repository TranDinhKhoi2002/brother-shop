import { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, IconButton, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/styles';
import config from '@/config';

type SearchInputProps = {
  className: string;
  closeSearch: () => void;
};

function SearchInput(props: SearchInputProps): ReactElement {
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();
  const theme = useTheme<Theme>();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchInputValue = e.target.value;

    if (!searchInputValue.startsWith(' ')) {
      setSearchValue(searchInputValue);
    }
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
