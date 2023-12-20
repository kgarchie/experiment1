import {authenticate, createUser} from "./queries";
import {APIResponse} from "../../types";

const router = createRouter()

router.post("/signup", defineEventHandler(async event => {
    const response = {} as APIResponse
    const data = await readBody(event) as { name: string, password: string, email: string }

    await createUser(data).catch(async err => {
        useHttpEnd(event,{ error: err }, 500)
    })

    const token = await authenticate({email: data.email, password: data.password}).catch(async (err: Error) => {
        useHttpEnd(event, { error: err.message }, 500)
    })

    response.status = 200
    response.body = token
    return await useHttpResponse(event, response)
}))

export default useBase("/api/auth", router.handler)
