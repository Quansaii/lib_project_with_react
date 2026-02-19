export function HomePage({ query, setQuery, onSearch }) {
  return (
    <div className="container">
      <header className="welcome-section">
        <h1>Добро пожаловать в библиотеку</h1>
        <p>Найдите свою следующую любимую историю.</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Введите название..."
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={onSearch}>Найти</button>
      </div>
    </div>
  );
}