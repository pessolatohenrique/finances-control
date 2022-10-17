const { KafkaConnection } = require("../config");
const { KafkaNotConnected } = require("../utils/Errors");

class ConsumerWrapper {
  static async initialize({
    name,
    groupId,
    topics,
    fromBeginning,
    customFunction,
  }) {
    try {
      const kafka = KafkaConnection.configure();

      const consumer = kafka.consumer({ groupId });

      await consumer.connect();
      await consumer.subscribe({
        topics,
        fromBeginning,
      });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          if (typeof customFunction === "function") {
            customFunction({ topic, partition, message });
            return;
          }
          console.log({
            Consumer: name,
            topic,
            partition,
            value: JSON.parse(message.value.toString()),
          });
        },
      });
    } catch (error) {
      throw new KafkaNotConnected();
    }
  }
}

module.exports = ConsumerWrapper;
