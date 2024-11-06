import PropTypes from "prop-types";

export const Post = ({ title, contents, author }) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <em>
        <br />
        Written by {author}
      </em>
    </article>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string.isRequired,
};
