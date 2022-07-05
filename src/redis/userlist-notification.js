const redis = require("redis");
const manipulateList = require("./manipulate-list");
const allowList = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  prefix: "userlist-notification:",
});
module.exports = manipulateList(allowList);
