import { CreatePost } from "./components/CreatePost";
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";
import { PostList } from "./components/PostList";
import { faker } from "@faker-js/faker";

const tags = [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()];

const posts = [
  {
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    contents: faker.lorem.paragraph(),
    tags: [tags[0], tags[1]],
  },
  {
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    contents: faker.lorem.paragraph(),
    tags: [tags[2]],
  },
  {
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    contents: faker.lorem.paragraph(),
    tags,
  },
];

export function App() {
  return (
    <>
      <div>
        <CreatePost></CreatePost>
      </div>
      <div>
        <PostFilter field="author"></PostFilter>
        <PostSorting fields={["createdAt", "updatedAt"]}></PostSorting>
      </div>
      <div>
        <PostList posts={posts}></PostList>
      </div>
    </>
  );
}
