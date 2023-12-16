export enum Message {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    ERROR = 'error',
    MESSAGE = 'message',
    TYPING = 'typing'
}

export type SocketMessage = {
    type: Message,
    data?: any
}

export type APIResponse = {
    status: number,
    body: any
}

export const SocketPort = 8000
