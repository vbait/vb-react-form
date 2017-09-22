export default class PubSub {
  subscribers = [];
  lastSubscriberId = 0;

  subscribe(fn) {
    this.lastSubscriberId = this.lastSubscriberId + 1;
    this.subscribers.push({
      callback: fn,
      id: this.lastSubscriberId,
    });
    return this.lastSubscriberId;
  }

  unsubscribe(id) {
    if (id) {
      for (let i = this.subscribers.length - 1; i >= 0; i -= 1) {
        if (this.subscribers[i].id === id) {
          this.subscribers.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  unsubscribeAll() {
    this.subscribers = [];
    this.lastSubscriberId = 0;
  }

  publish(...args) {
    this.subscribers.forEach((subscriber) => {
      subscriber.callback.apply(null, args);
    });
  }
}
