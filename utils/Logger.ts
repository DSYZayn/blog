/**
 * @class webLogger
 * @description web端日志类，用于在浏览器控制台输出彩色日志
 */
export class Logger {
    /**
     * @param {string} level
     */
    private _name: string;
    private _level: string;
    private _levelnum: number;
    private color: string;

    /**
     * @param {string} level
     */
    set level(level: string) {
        if (["debug", "info", "warn", "error"].indexOf(level) == -1) {
            throw new Error("level must be debug | info | warn | error");
        }
        this._level = level;
        this._levelnum = ["debug", "info", "warn", "error"].indexOf(level);
    }
    /**
     *
     * @param name: logger name
     * @param level: log level
     */
    constructor(name = "log", level = "debug") {
        this._level = "debug"; // debug | info | warn | error
        this._levelnum = 0;
        this._name = name;
        this.level = level;
        this.color = this.stringToColor(name);
    }
    debug(...msg: any[]) {
        if (this._levelnum > 0) return;
        let css = "color:#17a8cd;background-color:#d4f5ff;";
        console.log(
            "%c%s",
            css,
            `[${this.getTimestamp()}] [DEBUG] [${this._name}] - `,
            ...msg
        );
    }
    info(...msg: any[]) {
        if (this._levelnum > 1) return;
        let css = "color:#008a15;background-color:#e6ffe9;";
        console.log(
            "%c%s",
            css,
            `[${this.getTimestamp()}] [INFO] [${this._name}] - `,
            ...msg
        );
    }
    warn(...msg: any[]) {
        if (this._levelnum > 2) return;
        let css = "color:#e88f21;background-color:#fffbe6;";
        console.log(
            "%c%s",
            css,
            `[${this.getTimestamp()}] [WARN] [${this._name}] - `,
            ...msg
        );
    }
    error(...msg: any[]) {
        if (this._levelnum > 3) return;
        let css = "color:#ff0000;background-color:#fff0f0;";
        console.log(
            "%c%s",
            css,
            `[${this.getTimestamp()}] [ERROR] [${this._name}] - `,
            ...msg
        );
    }
    getTimestamp() {
        return new Date(new Date().valueOf() + 1000 * 60 * 60 * 8).toISOString();
    }

    /**
       * 打印日志，颜色为基于name的随机颜色
       * @param msg
    */
    log(...msg: any[]) {
        console.log(
            "%c%s",
            `color:${this.color};`,
            `[${this.getTimestamp()}] [LOG] [${this._name}] - `,
            ...msg
        );
    }
    // 将任意字符串转换为颜色值
    stringToColor(str:string) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var color = "#";
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xff;
            color += ("00" + value.toString(16)).substr(-2);
        }
        return color;
    }
}
