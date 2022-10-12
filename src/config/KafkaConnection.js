const { Kafka } = require("kafkajs");

class KafkaConfig {
  static configure() {
    try {
      const kafka = new Kafka({
        clientId: "finances-control",
        brokers: [process.env.KAFKA_BROKER],
      });

      return kafka;
    } catch (error) {
      console.log(`Failed to initialize Kafka: ${error}`);
    }
  }
}

module.exports = KafkaConfig;
