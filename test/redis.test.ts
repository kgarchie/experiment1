import { expect, test } from "bun:test";
import { Redis } from "ioredis";
import { exec } from "node:child_process";

function isRedisRunning(callback: Function) {
    if (process.platform !== "linux") return console.warn("Redis is only supported on Linux")

    exec(`pgrep -x redis-server`, (error, stdout, stderr) => {
        if (stderr) return console.error(stderr)
        if (error || stdout.trim() === "") return callback(false)
        callback(true)
    });
}

function startRedisServer() {
    exec('redis-server', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting Redis server: ${error.message}`);
        } else {
            console.log(`Redis server started: ${stdout}`);
        }
    });
}


function stopRedisServer() {
    exec('redis-cli shutdown', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping Redis server: ${error.message}`);
        } else {
            console.log(`Redis server stopped: ${stdout}`);
        }
    });
}


await new Promise<void>((resolve) => {
    isRedisRunning((isRunning: Boolean) => {
        if (isRunning) {
            console.log('Redis server is already running.');
            resolve()
        } else {
            startRedisServer();
            resolve()
        }
    });
})

test("redis_default", async () => {
    const redis = new Redis()
    await redis.set("foo", "bar")

    const result = await redis.get("foo")
    expect(result).toBe("bar")

    await redis.del("foo")
    redis.disconnect()
    stopRedisServer()
})