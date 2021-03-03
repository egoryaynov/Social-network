let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('WebSocket close, trying to reconnect....')
    setTimeout(createChannel, 3000)
}

const messageHandler = (wsMessage: MessageEvent) => {
    const newMessages = JSON.parse(wsMessage.data)
    subscribers.forEach(s => s(newMessages))
}

const createChannel = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.close()
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s === callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type SubscriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}