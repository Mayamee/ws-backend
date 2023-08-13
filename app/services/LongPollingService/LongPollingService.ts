import { EventEmitter } from 'events'

export enum LongPollingServiceEvents {
  NEW_MESSAGE = 'newMessage',
}

class LongPollingService {
  constructor(private emitter: EventEmitter) {}

  onEvent = <B>(eventName: LongPollingServiceEvents, cb: (data: B) => void) => {
    this.emitter.once(eventName, cb)
  }
  emitEvent = <B>(eventName: LongPollingServiceEvents, ...data: B[]) => {
    this.emitter.emit(eventName, ...data)
  }
}

const longPollingService = new LongPollingService(new EventEmitter())

export { longPollingService as LongPollingService }
