export function CreateBookCard({ title, author, image, publishedDate }) {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={image || "https://via.placeholder.com/150"} alt={title} />
      </div>
      <div className="book-info">
        <h2 className="book-title">{title}</h2>
        <p className="book-author"><strong>Автор:</strong> {author}</p>
        <p className="book-year"><strong>Год выпуска:</strong> {publishedDate}</p>
      </div>
    </div>
  );
}