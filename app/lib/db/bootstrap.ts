import 'server-only';

import {initializeDatabase} from './init';

export const dbReady = initializeDatabase();
