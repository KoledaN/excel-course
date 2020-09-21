export class Emitter {
    constructor() {
        this.listeners = {};
    }

    // dispatch, fire, trigger
    // Уведомляем слушателей если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
        return true;
    }

    // on, listen
    // Подписываемся на уведомление
    // Добавляем нового слушателя
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] =
                this.listeners[event].filter((listener) => listener !== fn);
        };
    }
}

// const emitter = new Emitter();
// const unsubscribe = emitter.subscribe('nata', (data) => {
//     console.log('Nata is ' + data);
// });
//
// emitter.emit('nata', 30);
// emitter.emit('nata', 28);
// emitter.emit('natadfsdfgsdf', 333);
//
// setTimeout(() => {
//     emitter.emit('nata', 'after 2 sec');
// }, 2000);
//
// setTimeout(() => {
//     unsubscribe();
// }, 3000);
//
// setTimeout(() => {
//     emitter.emit('nata', 'after 4 sec');
// }, 4000);
