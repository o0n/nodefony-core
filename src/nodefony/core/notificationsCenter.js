const events = require('events');

module.exports = nodefony.register("notificationsCenter", function () {

    const regListenOn = /^on(.*)$/;
    const defaultNbListeners = 20;

    const Notification = class Notification {

        constructor(settings, context, nbListener) {
            this.event = new events.EventEmitter();
            this.setMaxListeners(nbListener || defaultNbListeners);
            if (settings) {
                this.settingsToListen(settings, context);
            }
        }

        /**
         *
         *  @method setMaxListeners
         *
         */
        setMaxListeners() {
            return this.event.setMaxListeners.apply(this.event, arguments);
        }

        /**
         *
         *  @method listen
         *
         */
        listen(context, eventName, callback) {
            if (typeof (callback) === 'function' || callback instanceof Function) {
                let event = arguments[1];
                let ContextClosure = this;
                this.event.addListener(eventName, callback.bind(context));
                return function () {
                    Array.prototype.unshift.call(arguments, event);
                    return ContextClosure.fire.apply(ContextClosure, arguments);
                };
            }
            throw new Error("notificationsCenter listen method callback must be a function");
        }

        on(eventName, callback) {
            let event = arguments[1];
            let ContextClosure = this;
            if (typeof (callback) === 'function' || callback instanceof Function) {
                this.event.addListener(eventName, callback);
                return function () {
                    Array.prototype.unshift.call(arguments, event);
                    return ContextClosure.fire.apply(ContextClosure, arguments);
                };
            }
            throw new Error("notificationsCenter on method callback must be a function");
        }

        /**
         *
         *  @method once
         *
         */
        once(eventName, callback) {
            let event = arguments[1];
            let ContextClosure = this;
            if (typeof (callback) === 'function' || callback instanceof Function) {
                this.event.once(eventName, callback);
                return function () {
                    Array.prototype.unshift.call(arguments, event);
                    return ContextClosure.fire.apply(ContextClosure, arguments);
                };
            }
            throw new Error("notificationsCenter once method callback must be a function");
        }

        /**
         *
         *  @method fire
         *
         */
        fire() {
            try {
                return this.event.emit.apply(this.event, arguments);
            } catch (e) {
                throw e;
            }
        }

        /**
         *
         *  @method settingsToListen
         *
         */
        settingsToListen(localSettings, context) {
            for (let i in localSettings) {
                let res = regListenOn.exec(i);
                if (!res) {
                    continue;
                }
                this.listen(context || this, res[0], localSettings[i]);
            }
        }

        /**
         *
         *  @method unListen
         *
         */
        unListen() {
            return this.event.removeListener.apply(this.event, arguments);
        }

        /**
         *
         *  @method removeAllListeners
         *
         */
        removeAllListeners() {
            return this.event.removeAllListeners.apply(this.event, arguments);
        }
    };
    return {
        notification: Notification,
        /**
         *
         *  @method create
         *
         */
        create: function (settings, context, nbListener) {
            return new Notification(settings, context, nbListener);
        }
    };
});
