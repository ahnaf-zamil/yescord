namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SECRET_KEY: string;
    EUREKA_HOST: string;
    EUREKA_PORT: number;

    MYSQL_HOST: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DB: string;
  }
}
