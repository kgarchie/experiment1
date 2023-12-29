import { WebSocketServer } from 'ws'

declare global {
    var connections: Set<WebSocket>
}

export default defineNitroPlugin(app => {
    const wss = new WebSocketServer({ noServer: true })

    function onConnect(ws: WebSocket) {
        ws.onmessage = (event) => {
            const message = event.data
            console.log(`Received message => ${message}`)
        }

        ws.onclose = () => {
            console.log("Client disconnected")
        }

        ws.onopen = () => {
            ws.send("Hello from Nitro!")
            console.log("Client connected")
        }
    }

    app.h3App.use("/ws", (event) => {
        console.log("WebSocket connection request")
        wss.handleUpgrade(event.node.req, event.node.res.socket, Buffer.alloc(0), onConnect)
    })
})