import { memo } from 'react';

type Props = {
  searchValue: string;
  onChangeSearchValue: () => void;
};

function SearchInput({ searchValue, onChangeSearchValue }: Props) {
  return (
    <input
      id="searchValue"
      className="rounded-lg text-center border text-black"
      type="search"
      name="searchValue"
      placeholder="Search by book name"
      value={searchValue}
      onChange={(e) => onChangeSearchValue(e.target.value)}
    />
  );
}

export default memo(SearchInput);
