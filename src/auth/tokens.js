const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const allowList = require("../redis/allowlist-refresh-token");
const forgotList = require("../redis/forgotlist-token");
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "5d";

module.exports = {
  access: {
    create(id) {
      const payload = { id };
      return jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: ACCESS_EXPIRES_IN,
      });
    },
  },
  refresh: {
    async create(id) {
      const token = crypto.randomBytes(24).toString("hex");
      const expires_at = moment().add("5", "d").unix();
      await allowList.insert(token, id, expires_at);
      return token;
    },
    async search(refreshToken) {
      const id = await allowList.search(refreshToken);
      return id;
    },
    async delete(refreshToken) {
      await allowList.delete(refreshToken);
    },
  },
  forgotPassword: {
    async create(id) {
      const token = crypto.randomBytes(24).toString("hex");
      const expires_at = moment().add("1", "h").unix();
      await forgotList.insert(token, id, expires_at);
      return token;
    },
    async search(token) {
      const id = await forgotList.search(token);
      await this.delete(token);
      return id;
    },
    async delete(token) {
      await forgotList.delete(token);
    },
  },
};
