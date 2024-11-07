export const CreatePost = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input type="text" name="create-title" id="create-title" />
      </div>
      <div>
        <label htmlFor="create-author">Author:</label>
        <input type="text" name="create-author" id="create-author" />
      </div>
      <br />
      <textarea></textarea>
      <br />
      <br />
      <input type="submit" value="Create Post" />
    </form>
  );
};
