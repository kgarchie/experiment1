import {APIResponse} from "../../types";

export default defineEventHandler(() => {
    const response = {} as APIResponse
    response.status = 200
    response.body = "Server is running"
    return response
})
