/* eslint-disable no-console */
const middleware = () => (next) => (action) => {
  const result = next(action);
  console.log(action);
  return result;
};
export default middleware;
