import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

export const storage = createStorage({
  driver: redisDriver({
    base: "unstorage",
    host: 'localhost',
    tls: false as any,
    port: 6379,
    password: ''
  }),
});
