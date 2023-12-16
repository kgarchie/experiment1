import {APIResponse} from "../../../types";
import {HttpSend, HttpEnd} from "../utils";
import {createUser, authenticate} from "./queries"

export default defineEventHandler(async event => {
    const response = {} as APIResponse
    const data = await readBody(event) as { name: string, password: string, email: string }

    await createUser(data).catch(async err => {
        await HttpSend(event, { error: err }, 500)
        HttpEnd(event)
    })

    const token = await authenticate({email: data.email, password: data.password}).catch(async err => {
        await HttpSend(event, { error: err }, 500)
        HttpEnd(event)
    })

    response.status = 200
    response.body = token
    return await HttpSend(event, response)
})
