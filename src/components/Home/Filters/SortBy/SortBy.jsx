import "./SortBy.css";

const sortOptions = ["Best Selling", "Price: Low to High", "Price: High to Low", "Newest Arrivals"];

const SortBy = () => {
  return (
    <div className="sort-by-container">
      <select name="sort" className="sort-dropdown">
        <option value="">Sort By</option>
        {sortOptions.map((option, index) => (
          <option key={index} value={option.toLowerCase().replace(/ /g, "-")}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
