let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('WebSocket close, trying to reconnect....')
    setTimeout(createChannel, 3000)
}

const messageHandler = (wsMessage: MessageEvent) => {
    const newMessages = JSON.parse(wsMessage.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}

const errorHandler = (wsMessage: Event) => {
    notifyStatusChangedSubscribers('error')
    console.log('Trouble with connect to WebSocket, reload page')
}

const openHandler = () => {
    notifyStatusChangedSubscribers('ready')
}

const notifyStatusChangedSubscribers = (status: ChatStatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

const createChannel = () => {
    cleanUp()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifyStatusChangedSubscribers('pending')

    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

const cleanUp = () => {
    ws?.close()
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        Object.keys(subscribers).forEach(eventName => {
            subscribers[eventName as keyof typeof subscribers] = [];
        })
        cleanUp()
    },
    subscribe(eventName: EventsNamesType, callback: CallbacksType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubscribe(eventName: EventsNamesType, callback: CallbacksType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s === callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type CallbacksType = StatusChangedSubscriberType | MessagesReceivedSubscriberType
type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: ChatStatusType) => void

type EventsNamesType = 'message-received' | 'status-changed'
export type ChatStatusType = 'pending' | 'ready' | 'error'

export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
}