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

export const SocketPort = 8000