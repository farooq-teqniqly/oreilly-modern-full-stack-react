export default async function globalTeardown() {
  global.__MONGOCONTAINER.stop();
}
