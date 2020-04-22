// tslint:disable no-console
// tslint:disable max-line-length
import { LogBase, ReadonlyLog } from './loggy-base';
import { LogLevel } from './loggy-level';
import { defaultStyle, LoggyStyle } from './loggy-style';

let logLevel: LogLevel = LogLevel.Debug;
export function setLogLevel(level: LogLevel) {
    logLevel = level;
}

export function createLoggy<T extends LogBase>(definitions: T, style: Partial<LoggyStyle> = {}): ReadonlyLog<T> {
    const mergedStyle = {...defaultStyle, ...style};

    const logs = {
        debug: {},
        log: {},
        info: {},
        warn: {},
        error: {},
    };

    for (const key of Object.keys(definitions)) {
        logs.debug[key] =
            logLevel <= 0 ? console.debug.bind(console, `%c ${definitions[key]}${mergedStyle.separator}`, mergedStyle.debug) : () => {};
    }
    for (const key of Object.keys(definitions)) {
        logs.log[key] =
            logLevel <= 1 ? console.log.bind(console, `%c ${definitions[key]}${mergedStyle.separator}`, mergedStyle.log) : () => {};
    }
    for (const key of Object.keys(definitions)) {
        logs.info[key] =
            logLevel <= 2 ? console.info.bind(console, `%c ${definitions[key]}${mergedStyle.separator}`, mergedStyle.info) : () => {};
    }
    for (const key of Object.keys(definitions)) {
        logs.warn[key] =
            logLevel <= 3 ? console.warn.bind(console, `%c ${definitions[key]}${mergedStyle.separator}`, mergedStyle.warn) : () => {};
    }
    for (const key of Object.keys(definitions)) {
        logs.error[key] =
            logLevel <= 4 ? console.error.bind(console, `%c ${definitions[key]}${mergedStyle.separator}`, mergedStyle.error) : () => {};
    }

    return logs as ReadonlyLog<T>;
}
