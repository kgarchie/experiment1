import {isBun} from "std-env";
//https://nitro.unjs.io/config
export default defineNitroConfig({
    storage: {
        'redis': {
            driver: 'redis',
            base: "unstorage",
            host: process.env.REDIS_HOST ?? "localhost",
            tls: false as any,
            port: process.env.REDIS_PORT ?? 6379,
            password: process.env.REDIS_PASSWORD ?? undefined,
        },
        'file': {
            driver: 'fs',
            base: "./filestore"
        }
    },
    preset: isBun ? 'bun': 'node-server'
});
