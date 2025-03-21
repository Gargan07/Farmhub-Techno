import "./FilterBy.css";

const filterOptions = [
  {
    name: "Headphone Type",
    options: ["Over-Ear", "In-Ear", "On-Ear"],
  },
  {
    name: "Price",
    options: ["Low to High", "High to Low", "Under $50", "Above $50"],
  },
  {
    name: "Brand",
    options: ["Sony", "Bose", "JBL", "Beats"],
  },
];

const FilterBy = () => {
  return (
    <div className="contains-select">
      {filterOptions.map((filter, index) => (
        <div className="select-dropdown" key={index}>
          <select name={filter.name.toLowerCase().replace(" ", "-")}>
            <option value="">{filter.name}</option>
            {filter.options.map((option, idx) => (
              <option key={idx} value={option.toLowerCase().replace(" ", "-")}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterBy;
