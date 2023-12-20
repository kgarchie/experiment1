import {H3Event} from "h3";
import {APIResponse} from "../types";

export async function useHttpResponse(event: H3Event, data?: Object, status: number = 200): Promise<void> {
    const response = {} as APIResponse
    response.status = status
    response.body = data

    await event.respondWith(new Response(JSON.stringify(response), {status: status}))
}

export function useHttpEnd(event: H3Event, data?: Object, status?: number): void {
    const end = () => {
        event.node.res.statusCode = 204
        event.node.res.end()
    }

    if (!data) return end()

    useHttpResponse(event, data, status ?? 200)
        .then(end)
        .catch((err) => {
            console.error(err || 'Unable to end request; useHttpEnd')
            end()
        })
}
