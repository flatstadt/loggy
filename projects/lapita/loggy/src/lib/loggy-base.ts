// tslint:disable no-console
// tslint:disable max-line-length

export interface LogBase {
    global: string;
}

export type Log<T extends LogBase> = Readonly<{[P in keyof T]: (...args) => void}>;
interface Logs<T extends LogBase> {
    debug: Log<T>;
    log: Log<T>;
    info: Log<T>;
    warn: Log<T>;
    error: Log<T>;
}

export type ReadonlyLog<T extends LogBase> = Readonly<Logs<T>>;
