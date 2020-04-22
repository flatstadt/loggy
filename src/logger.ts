import { createLoggy, setLogLevel } from '@lapita/loggy';

import { environment } from './environments/environment';


setLogLevel(environment.logLevel);
export const {debug, log, info, warn, error} = createLoggy({global: 'global stuff', auth: 'authorization', dashboard: 'dashboard'});
