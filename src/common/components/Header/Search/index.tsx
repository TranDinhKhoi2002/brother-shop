import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { Hits, SearchBox, useHits, useSearchBox } from 'react-instantsearch';
import { Box, Card, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CustomHit from './Hit';
import config from '@/config';
import NoSearchResult from '@/modules/search/NoSearchResult';

type SearchInputProps = {
  className: string;
  closeSearch: () => void;
};

function SearchInput({ className, closeSearch }: SearchInputProps): ReactElement {
  const { query } = useSearchBox();
  const { hits } = useHits();
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (isEmpty(query)) return;

    router.push({ pathname: config.routes.search, query: { keyword: query } });
    closeSearch();
  };

  return (
    <>
      <Box className={`${className} !bg-white`}>
        <SearchBox
          placeholder="Tìm kiếm sản phẩm"
          autoFocus={true}
          spellCheck={false}
          classNames={{
            root: 'w-full',
            form: 'w-full',
            input: 'w-[90%] border-none outline-none text-xl lg:text-[40px]',
            submitIcon: 'ml-3',
            resetIcon: 'hidden',
          }}
          onSubmit={handleSearchSubmit}
          submitIconComponent={() => <SearchIcon sx={{ fontSize: '30px', mb: '12px' }} />}
        />
        <Card elevation={5} className="absolute top-20 left-4 right-4 z-[1000] bg-white">
          <Typography sx={{ textAlign: 'end', mt: 3, mr: 3, cursor: 'pointer' }} onClick={closeSearch}>
            Đóng
          </Typography>
          {hits.length > 0 ? (
            <Box className="max-h-[65vh] overflow-y-scroll">
              <Hits hitComponent={({ hit }) => <CustomHit hit={hit} onSelect={closeSearch} />} className="px-8" />

              {query && (
                <Link
                  href={`${config.routes.search}?keyword=${query}`}
                  className="text-center block font-medium mb-5"
                  onClick={closeSearch}
                >
                  Xem tất cả
                  <KeyboardDoubleArrowRightIcon />
                </Link>
              )}
            </Box>
          ) : (
            <NoSearchResult keyword={query} />
          )}
        </Card>
      </Box>
    </>
  );
}

export default SearchInput;
