const cron = require("node-cron");
const userModel = require("../models").User;
const userListNotification = require("../redis/userlist-notification");

class CronWrapper {
  static initialize() {
    // run every day 04 at 21:05
    const taskFirstTenDays = cron.schedule("05 21 4 * *", async () => {
      const users = await userModel.findAll();

      users.forEach(async (item) => {
        await userListNotification.rpush(item.email);
      });
    });

    taskFirstTenDays.start();
  }
}

module.exports = CronWrapper;
