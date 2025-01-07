import "../style/Rating.css";
const RATINGS = [1, 2, 3, 4, 5];
function Star({ rating, onSelect, selected = false, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      className={className}
    >
      *
    </span>
  );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          rating={rating}
          onSelect={onSelect}
          key={rating}
          selected={value >= rating}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
