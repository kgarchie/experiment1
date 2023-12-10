import { expect, test } from "bun:test";
import { Redis } from "ioredis";

test("redis_default", async () => {
    const redis = new Redis()
    
    await redis.set("foo", "bar")
    const result = await redis.get("foo")

    expect(result).toBe("bar")
    await redis.del("foo")
    
    redis.disconnect()
})
