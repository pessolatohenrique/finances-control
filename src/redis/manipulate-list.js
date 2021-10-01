const { promisify } = require("util");

module.exports = (list) => {
  const setAsync = promisify(list.set).bind(list);
  const getAsync = promisify(list.get).bind(list);
  const delAsync = promisify(list.del).bind(list);

  return {
    async insert(key, value, expires) {
      const inserted = await setAsync(key, value);
      list.expireat(key, expires);
    },
    async search(key) {
      const result = await getAsync(key);
      return result;
    },
    async delete(key) {
      await delAsync(key);
    },
  };
};
