import { WebSocketServer, WebSocket } from 'ws'
import { NodeIncomingMessage, NodeServerResponse } from "h3";
import { NitroApp } from 'nitropack';
import internal from 'stream';

declare global {
    var connections: Set<WebSocket>
}

function shutdown(wss: WebSocketServer) {
    wss.close()
    for (const ws of globalThis.connections) {
        ws.close()
    }
}

export default defineNitroPlugin((app: NitroApp) => {
    if (!globalThis.connections) globalThis.connections = new Set<WebSocket>()
    const wss = new WebSocketServer({ noServer: true })

    function onConnect(ws: WebSocket) {
        console.log("Client Connected to WsServer")

        ws.onmessage = (event) => {
            const message = event.data
            console.log(`Received message => ${message}`)
        }

        ws.onclose = () => {
            console.log("Client Disconnected from WsServer")
        }

        ws.onopen = () => {
            console.log("Client connected")
        }
    }

    app.router.use("/ws", fromNodeMiddleware((req: NodeIncomingMessage, res: NodeServerResponse) => {
        const socket: internal.Duplex = req.socket
        wss.handleUpgrade(req, socket, Buffer.alloc(0), (ws) => {
            wss.emit("connection", ws, req)
            onConnect(ws)
        })
    }))

    app.hooks.hook("close", () => {
        shutdown(wss)
    })

    app.hooks.hook('error', (error, context) => {
        console.error(error)
        console.debug(context)
        shutdown(wss)
    })

    useBase("/", app.router.handler)
})
