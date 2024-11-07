import { Fragment } from "react";
import PropTypes from "prop-types";
import { Post } from "./Post";

export const PostList = ({ posts = [] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post}></Post>
          <hr />
        </Fragment>
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
