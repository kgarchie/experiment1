//https://nitro.unjs.io/config
export default defineNitroConfig({
    storage: {
        'redis': {
            driver: 'redis',
            base: "unstorage",
            host: 'localhost',
            tls: false as any,
            port: 6379,
            password: ''
        }
    },
    preset: "bun"
});
