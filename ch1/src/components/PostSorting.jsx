import PropTypes from "prop-types";

export const PostSorting = ({ fields = [] }) => {
  return (
    <div>
      <label htmlFor="sortBy">Sort by:</label>
      <select name="sortBy" id="sortBy">
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {" | "}
      <label htmlFor="sortOrder">Sort order:</label>
      <select name="sortOrder" id="sortOrder">
        <option value="{'ascending'}">ascending</option>
        <option value="{'descending'}">descending</option>
      </select>
    </div>
  );
};

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};
