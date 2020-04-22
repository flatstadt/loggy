import { LoggyProxy } from './loggy-method.decorator';

export interface LoggyPropertyOptions {
    logCalls: boolean;
    logValue: boolean;
    accessType: 'get' | 'set' | 'get/set';
    enable: boolean;
}

const defaults: LoggyPropertyOptions = {
    logCalls: true,
    logValue: false,
    accessType: 'get/set',
    enable: true,
};

function logProperty(
    key: string,
    val: any,
    accessType: string,
    fcn: LoggyProxy,
    metrics: {get: number; set: number},
    options: Partial<LoggyPropertyOptions>
) {
    if (options.logCalls === true) {
        const texts = [];
        if (accessType === 'get') {
            texts.push(`got ${metrics.get} ${metrics.get === 1 ? 'time' : 'times'}`);
        }
        if (accessType === 'set') {
            texts.push(`set ${metrics.set} ${metrics.set === 1 ? 'time' : 'times'}`);
        }
        fcn(`${key} ${texts.join(' and ')}`);
    }
    if (options.logValue === true) {
        fcn(`${accessType} ${key} ${accessType === 'get' ? '==>' : '<=='} ${val}`);
    }
}

export function LoggyProperty(fcn: LoggyProxy, opts?: Partial<LoggyPropertyOptions>) {
    const options = {...defaults, ...(opts || {})};
    if (!options.enable) {
        return;
    }
    const metrics = {get: 0, set: 0};
    return function (target: any, key: string) {
        // property value
        let _val = target[key];
        // property getter
        const getter = () => {
            if (options.accessType && options.accessType.includes('get')) {
                metrics.get = metrics.get + 1;
                logProperty(key, _val, 'get', fcn, metrics, options);
            }
            return _val;
        };
        // property setter
        const setter = newVal => {
            if (options.accessType && options.accessType.includes('set')) {
                metrics.set = metrics.set + 1;
                logProperty(key, newVal, 'set', fcn, metrics, options);
            }
            _val = newVal;
        };
        // Delete property.
        if (delete target[key]) {
            // target[key] = undefined;
            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        }
    };
}
