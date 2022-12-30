const moment = require('moment');

class Logger {
    constructor() {
        this.fgBlack = "\x1b[30m";
        this.fgRed = "\x1b[31m";
        this.fgGreen = "\x1b[32m";
        this.fgYellow = "\x1b[33m";
        this.fgBlue = "\x1b[34m";
        this.fgMagenta = "\x1b[35m";
        this.fgCyan = "\x1b[36m"
        this.fgWhite = "\x1b[37m";
        this.resetStr = '\x1b[0m'
    }

    log(message) {
        console.log(`${this.fgBlack}[${moment().format('YYYY-MM-DD HH:mm:ss')}] - ${this.fgBlue}${message}${this.resetStr}`);
    }

    warn(message) {
        console.log(`${this.fgBlack}[${moment().format('YYYY-MM-DD HH:mm:ss')}] - ${this.fgYellow}${message}${this.resetStr}`);
    }

    error(message) {
        console.log(`${this.fgBlack}[${moment().format('YYYY-MM-DD HH:mm:ss')}] - ${this.fgRed}${message}${this.resetStr}`);
    }
}

module.exports = new Logger();