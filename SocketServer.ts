import type { Serve } from "bun"
import { type SocketMessage, SocketPort } from "./types"

const serve: Serve = {
    fetch(req, server) {
        console.log(req)
        if (server.upgrade(req)) return
        return new Response("Upgrade to WebSocket Failed :(", { status: 500 })
    },
    
    websocket: {
        open(ws) {
            console.log('ws open')
        },
        message(ws, msg) {
            console.log('ws message')
        },
        close(ws) {
            console.log('ws close')
        }
    }
}

export default Bun.serve<SocketMessage>(serve)