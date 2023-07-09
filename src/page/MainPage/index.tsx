import { useState, lazy, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row } from 'react-bootstrap';

const MainBookList = lazy(() => import('../../components/MainBookList'));
const SearchInput = lazy(() => import('../../components/SearchInput'));

function MainPage() {

  // Current page status information
  const maxResults = 40;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue != "") {
        setItems([]);
        setPage(0);
        fetchData(true);
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  const fetchData = async (refresh: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (refresh)
        response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=${maxResults}&startIndex=0`);
      else
        response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=${maxResults}&startIndex=${page * maxResults}`);
      const data = await response.json();
      if (data.items) {
        setItems(prevItems => [...prevItems, ...data.items]);
        setPage(prevPage => prevPage + 1);
      }
      else {
        setHasMore(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (e: HTMLElement) => {
    const bottom = e.target.scrollingElement.scrollTop - e.target.scrollingElement.offsetHeight == e.target.scrollingElement.scrollHeight - 100;
    if (bottom && !isLoading) {
      fetchData();
    }
  };

  const onChangeSearchValue = (text: string) => {
    setSearchValue(text);
  };

  return (
    <div className="h-screen pt-8 mx-0 md:pt-16">
      <header className="flex w-full h-10 justify-around flex-wrap flex-row">
        {/* logo */}
        <div className="inline-flex flex-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <b className="sm:text-base md:text-2xl">Book management system</b>
        </div>
        <SearchInput searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      </header>
      <main className="Container flex flex-col mt-8 mx-3 sm:mt-4 md:mx-8 lg:mx-24 justify-center">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          endMessage={<p>No more data to load.</p>}
        >
          <Row>
            <MainBookList booksInfo={items} />
          </Row>
          {error && <p>Error: {error.message}</p>}
        </InfiniteScroll>
      </main>

    </div>
  );
}

export default MainPage;
