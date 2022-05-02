namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SECRET_KEY: string;
    CONSUL_HOST: string;
    CONSUL_PORT: string;

    MYSQL_HOST: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DB: string;

    KAFKA_BROKER: string | undefined;
  }
}
