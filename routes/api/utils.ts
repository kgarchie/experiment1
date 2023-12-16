import {H3Event} from "h3";
import {APIResponse} from "../../types";
import {randomBytes, pbkdf2Sync} from "crypto";

export const HttpSend = async (event: H3Event, data: Object, status: number = 200): Promise<void> => {
    const response = {} as APIResponse
    response.status = status
    response.body = data

    await event.respondWith(new Response(JSON.stringify(response), {status: status}))
}

export const HttpEnd = (event: H3Event, status: number = 444) => {
    event.node.res.statusCode = status
    event.node.res.end()
}

export function hashPassword(password: string): { salt: string, hash: string } {
    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    return {salt, hash}
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
    const verify = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return verify === hash
}

