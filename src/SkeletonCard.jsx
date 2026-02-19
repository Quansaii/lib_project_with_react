export function SkeletonCard() {
  return (
    <div className="skeleton-card main-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line text"></div>
        <div className="skeleton-line text"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
}