import { createStorage } from "unstorage";
import { test, expect } from "bun:test";
import { storage } from "../storage";


test("unstorage_default", async () => {
    const default_storage = createStorage()
    await default_storage.setItem("foo", "bar")
    expect(await default_storage.getItem("foo")).toBe("bar")
    await default_storage.removeItem("foo")
})

test("unstorage_redis", async () => {
    await storage.setItem("foo", "bar")
    expect(await storage.getItem("foo")).toBe("bar")
    await storage.removeItem("foo")
    await storage.dispose()
})