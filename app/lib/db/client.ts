import 'server-only';

import {connect} from '@tursodatabase/serverless';

function requireEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }

  return value;
}

export const db = connect({
  url: requireEnv(process.env.TURSO_DATABASE_URL, 'TURSO_DATABASE_URL'),
  authToken: requireEnv(process.env.TURSO_AUTH_TOKEN, 'TURSO_AUTH_TOKEN'),
});
