const CONFIG_SERVER = process.env.CONFIG_SERVER_URL || 'http://localhost:9000';
const EUREKA = process.env.EUREKA_URL || 'http://localhost:9001/eureka/';

module.exports = {
  apps: [
    {
      name: 'member-service',
      script: 'java',
      args: `-jar member-service/target/member-service-1.0.0.jar --spring.config.import=configserver:${CONFIG_SERVER}`,
      env: {
        CONFIG_SERVER_URL: CONFIG_SERVER,
        EUREKA_URL: EUREKA,
        MEMBER_DB_URL: process.env.MEMBER_DB_URL,
        MEMBER_DB_USERNAME: process.env.MEMBER_DB_USERNAME,
        MEMBER_DB_PASSWORD: process.env.MEMBER_DB_PASSWORD,
      },
      log_file: './logs/member-service.log',
      instances: 1,
    },
    {
      name: 'book-service',
      script: 'java',
      args: `-jar book-service/target/book-service-1.0.0.jar --spring.config.import=configserver:${CONFIG_SERVER}`,
      env: {
        CONFIG_SERVER_URL: CONFIG_SERVER,
        EUREKA_URL: EUREKA,
        BOOK_MONGO_URI: process.env.BOOK_MONGO_URI,
        STORAGE_PROVIDER: process.env.STORAGE_PROVIDER,
        GCS_PROJECT_ID: process.env.GCS_PROJECT_ID,
        GCS_BUCKET: process.env.GCS_BUCKET,
        GCS_CREDENTIALS_PATH: process.env.GCS_CREDENTIALS_PATH,
      },
      log_file: './logs/book-service.log',
      instances: 1,
    },
    {
      name: 'borrowing-service',
      script: 'java',
      args: `-jar borrowing-service/target/borrowing-service-1.0.0.jar --spring.config.import=configserver:${CONFIG_SERVER}`,
      env: {
        CONFIG_SERVER_URL: CONFIG_SERVER,
        EUREKA_URL: EUREKA,
        BORROWING_MONGO_URI: process.env.BORROWING_MONGO_URI,
      },
      log_file: './logs/borrowing-service.log',
      instances: 1,
    },
  ],
};
