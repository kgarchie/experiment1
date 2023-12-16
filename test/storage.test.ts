import { createStorage } from "unstorage";
import {expect, test} from "bun:test";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({
    driver: fsDriver({
        base: "./test/storage"
    })
})

test("storage_default", async () => {
    await storage.setItem("foo", "bar")
    const result = await storage.getItem("foo")
    expect(result).toBe("bar")
    await storage.removeItem("foo")
    await storage.dispose()
})
