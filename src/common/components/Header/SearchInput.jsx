import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

function SearchInput(props) {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.push({ pathname: '/search', query: { state: { keyword: debouncedValue } } });
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
    <header className={`${props.className} bg-white`}>
      <input
        className="w-[95%] border-none outline-none text-xl lg:text-[40px]"
        autoFocus
        value={searchValue}
        onChange={inputChangeHandler}
        placeholder="Nhập sản phẩm cần tìm"
        spellCheck={false}
      />
      <FontAwesomeIcon
        className="text-[30px] text-[#868995] hover:text-[#3d3f45] ml-2 transition duration-300 ease cursor-pointer"
        icon={faXmark}
        onClick={props.closeSearch}
      />
    </header>
  );
}

export default SearchInput;
