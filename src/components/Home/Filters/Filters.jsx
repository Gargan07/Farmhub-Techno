import FilterBy from "./FilterBy/FilterBy";
import SortBy from "./SortBy/SortBy";
import "./Filters.css";

const Filters = () => {
  return (
    <div className="filters-wrapper">
      <div className="filters-container">
        <FilterBy />
        <SortBy />
      </div>
    </div>
  );
};

export default Filters;
