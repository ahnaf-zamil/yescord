import { Consumer, Kafka } from "kafkajs";
import { Server } from "socket.io";

const topics = ["MESSAGE_CREATE"];
export let kafkaConsumer: Consumer | undefined;

export const startKafka = async (
  broker: string,
  socketio: Server,
  callback: () => void
) => {
  const kafka = new Kafka({
    clientId: `gateway-${process.pid}`,
    brokers: [broker],
  });

  const consumer = kafka.consumer({ groupId: "gateway" });
  kafkaConsumer = consumer;
  await consumer.connect();

  topics.forEach(async (topic) => await consumer.subscribe({ topic }));

  callback();

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const raw = message.value?.toString();
      console.log(JSON.parse(raw!));
    },
  });
};
