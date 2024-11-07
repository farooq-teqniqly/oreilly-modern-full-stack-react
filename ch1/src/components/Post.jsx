import PropTypes from "prop-types";

export const Post = ({ title, contents, author, tags }) => {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <em>
        <br />
        Written by {author} | Tags: {tags.join(",")}
      </em>
    </article>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};
