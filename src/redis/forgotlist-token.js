const redis = require("redis");
const manipulateList = require("./manipulate-list");
const forgotList = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  prefix: "forgotlist-token:",
});
module.exports = manipulateList(forgotList);
