import {WebSocketServer} from 'ws'
import {NodeIncomingMessage, NodeServerResponse} from "h3";

declare global {
    var connections: Set<WebSocket>
}

export default defineNitroPlugin(app => {
    if (!globalThis.connections) globalThis.connections = new Set<WebSocket>()
    const wss = new WebSocketServer({noServer: true})

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
        wss.handleUpgrade(req, req.socket, null, onConnect)
        res.setHeader('Upgrade', 'websocket')
        res.setHeader('Connection', 'Upgrade')
        res.statusCode = 101
        res.end()
        console.log("Client connected")
    }))

    useBase("/", app.router.handler)
})
