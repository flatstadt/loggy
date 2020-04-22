export interface LoggyMethodOptions {
    logTime: boolean;
    logCalls: boolean;
    logContext: boolean;
    enable: boolean;
}

export type LoggyProxy = (text: string) => void;

const defaults: LoggyMethodOptions = {
    logTime: true,
    logCalls: false,
    logContext: false,
    enable: true,
};

function logMethod(
    key: string,
    args: any,
    result: any,
    fcn: LoggyProxy,
    metrics: {count: number; performace: number},
    options: LoggyMethodOptions
) {
    if (options.logTime) {
        fcn(`${key} took ${metrics.performace} ms`);
    }
    if (options.logCalls) {
        fcn(`${key} called ${metrics.count} times`);
    }
    if (options.logContext) {
        fcn(`called ${key} ${{args, result}}`);
    }
}

export function LoggyMethod(fcn: LoggyProxy, opts?: Partial<LoggyMethodOptions>) {
    const options = {...defaults, ...(opts || {})};
    if (!options.enable) {
        return;
    }
    const metrics = {count: 0, performace: 0};
    return (target: any, key: string, descriptor?) => {
        if (!descriptor) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }
        const originalMethod = descriptor.value;
        // editing the descriptor/value parameter
        descriptor.value = function (...args: any[]) {
            metrics.count = metrics.count + 1;
            const start = window.performance.now();
            const result = originalMethod.apply(this, args);
            metrics.performace = window.performance.now() - start;
            logMethod(key, args, result, fcn, metrics, options);
            return result;
        };
        return descriptor;
    };
}
