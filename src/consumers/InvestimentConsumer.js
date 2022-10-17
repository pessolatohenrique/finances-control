const ConsumerWrapper = require("../utils/ConsumerWrapper");
const { INVESTIMENT_NEW_STORE } = require("../enums/KafkaTopics");
const { KafkaNotConnected } = require("../utils/Errors");

class InvestimentConsumer {
  static async readRecents() {
    try {
      await ConsumerWrapper.initialize({
        name: "NewInvestimentConsumer",
        groupId: "new-investiment-group",
        topics: [INVESTIMENT_NEW_STORE],
        fromBeginning: true,
        //   customFunction: function ({ topic, partition, message }) {
        //     console.log("custom function!", topic, message.value.toString());
        //   },
      });
    } catch (error) {
      throw new KafkaNotConnected();
    }
  }
}

module.exports = InvestimentConsumer;
