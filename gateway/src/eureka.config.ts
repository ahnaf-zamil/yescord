export default {
  name: "GATEWAY",
  eureka: {
    host: process.env.EUREKA_HOST,
    port: parseInt(process.env.EUREKA_PORT!),
  },
};
