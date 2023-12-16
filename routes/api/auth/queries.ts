import {eq, and} from "drizzle-orm";
import db from '../../../db/db';
import {sessions, users} from "../../../db/drizzle/schema";
import {hashPassword, verifyPassword} from "../utils";
import {v4} from "uuid";
import {ulid} from 'ulid';

export async function createUser(data: { name: string, email: string, password: string }) {
    const auth = hashPassword(data.password)
    return db.insert(users).values({
        name: data.name,
        email: data.email,
        password: auth.hash,
        salt: auth.salt,
    }).catch((err) => {
        console.error(err)
        throw new Error('Unable to create user')
    })
}

export function getUserByEmail(email: string) {
    const rows = db.select()
        .from(users)
        .where(and(eq(users.email, email)))
        .catch((err) => {
            console.error(err)
            throw new Error('Unable to get user')
        })
    return rows[0]
}

export async function createToken(user: { userId: number, email: string }):Promise<string> {
    const uuid = v4()
    return await db.insert(sessions).values({
        userId: user.userId,
        token: uuid,
    }).then(() => uuid).catch((err) => {
        console.error(err)
        throw new Error('Unable to create token')
    })
}

export async function revokeToken(token: string, userId: number) {
    return await db.update(sessions).set({
        isValid: false,
    }).where(and(eq(sessions.token, token), eq(sessions.userId, userId))).catch((err) => {
        console.error(err)
        throw new Error('Unable to revoke token')
    })
}

export async function revokeAllTokens(userId: number) {
    return await db.update(sessions).set({
        isValid: false,
    }).where(eq(sessions.userId, userId)).catch((err) => {
        console.error(err)
        throw new Error('Unable to revoke token')
    })
}

export async function verifyToken(token: string) {
    const rows = await db.select()
        .from(sessions)
        .where(and(eq(sessions.token, token), eq(sessions.isValid, true)))
        .catch((err) => {
            console.error(err)
            throw new Error('Unable to verify token')
        })
    return rows[0].isValid
}

export async function getUserByToken(token: string) {
    const rows = await db.select()
        .from(sessions)
        .where(and(eq(sessions.token, token), eq(sessions.isValid, true)))
        .catch((err) => {
            console.error(err)
            throw new Error('Unable to verify token')
        })
    return rows[0]
}

export async function authenticate(data: { email: string, password: string }): Promise<string> {
    const user = await getUserByEmail(data.email)
    if (!user) throw new Error('User not found')

    const valid = verifyPassword(data.password, user.salt, user.password)
    if (!valid) throw new Error('Invalid password')

    return await createToken(user)
}
