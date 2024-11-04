import { GenericContainer } from "testcontainers";

const MONGOPORT = 27017;

export default async function globalSetup() {
  const mongoContainer = await new GenericContainer("mongo:6.0.4")
    .withExposedPorts(MONGOPORT)
    .start();

  global.__MONGOCONTAINER = mongoContainer;
  process.env.DATABASE_URL = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(MONGOPORT)}/blog`;
}
