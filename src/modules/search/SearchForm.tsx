import { FormEvent, RefObject } from 'react';

type SearchFormProps = {
  inputRef: RefObject<HTMLInputElement>;
  keyword: string;
  onSearch: (_e: FormEvent<HTMLFormElement>) => Promise<void>;
};

function SearchForm({ inputRef, keyword, onSearch }: SearchFormProps) {
  return (
    <div className="mt-3 px-4 xl:px-0">
      <form className="grid grid-cols-6 gap-2 xsm:gap-2" onSubmit={onSearch}>
        <input
          ref={inputRef}
          defaultValue={keyword}
          className="col-span-5 h-[43px] w-full py-[0.375rem] px-3 text-base font-normal text-[#495057] outline-none border-[1px] border-solid border-[#ced4da] focus:border-[#ee4266] rounded-[0.25rem] transition duration-150 "
          placeholder="Từ khóa"
          autoFocus
          spellCheck={false}
        />
        <button
          type="submit"
          className="col-span-1 text-[13px] text-white bg-[#17a2b8] border-[1px] border-solid border-[#17a2b8] rounded-[0.25rem] font-medium"
        >
          TÌM
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
