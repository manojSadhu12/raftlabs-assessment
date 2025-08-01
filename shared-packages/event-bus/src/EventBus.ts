class EventBus {
    private listeners: { [key: string]: Function[] } = {};

    constructor() {
        this.listeners = {};
    }

    on(eventName: string, callback: (data: any) => void) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    emit(eventName: string, data: any) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(callback => callback(data));
        }
    }
}

const eventBus = new EventBus();
export default eventBus;