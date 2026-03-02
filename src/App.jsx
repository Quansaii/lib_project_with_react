import { useState } from "react";
import { HomePage } from "./GenerateHomePage";
import { CreateBookCard } from "./BookCard";
import { SkeletonCard } from "./SkeletonCard"; 
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const searchBooks = async (isNewSearch = true) => {
    if (isNewSearch) {
      setBooks([]);
      setStartIndex(0);
    }

    const currentOffset = isNewSearch ? 0 : startIndex;
    setIsLoading(true);
    setIsError(false);

    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&startIndex=${currentOffset}&maxResults=5`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        if (isNewSearch) setIsError(true);
        return;
      }

      const newItems = data.items.filter(
        (book) => book.volumeInfo.imageLinks?.thumbnail,
      );

      if (isNewSearch) {
        setBooks(newItems);
        setStartIndex(5);
      } else {
        setBooks((prev) => {
          const trulyUnique = newItems.filter(
            (n) => !prev.some((p) => p.id === n.id),
          );
          return [...prev, ...trulyUnique];
        });
        setStartIndex((prev) => prev + 5);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <HomePage
        query={query}
        setQuery={setQuery}
        onSearch={() => searchBooks(true)}
      />
      <div className="results-container">
        {isLoading && books.length === 0 && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {books.map((item) => (
          <CreateBookCard
            key={item.id}
            title={item.volumeInfo.title}
            author={item.volumeInfo.authors?.[0] || "Неизвестен"}
            image={item.volumeInfo.imageLinks?.thumbnail}
            publishedDate={item.volumeInfo.publishedDate}
          />
        ))}
      </div>

      {isLoading && books.length > 0 && (
        <div className="spinner-wrapper">
          <div className="loader"></div>
          <p>Загружаем ещё больше книг...</p>
        </div>
      )}

      {isError && (
        <div className="not-found-card">
          <h3>Упс! Ничего не нашлось</h3>
        </div>
      )}

      {books.length > 0 && !isLoading && (
        <div className="button-wrapper">
          <button className="load-more-btn" onClick={() => searchBooks(false)}>
            Показать еще
          </button>
        </div>
      )}
    </div>
  );
}

export default App;