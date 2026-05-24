import {initializeDatabase} from '@/app/lib/db/init';

export async function register(): Promise<void> {
  console.log('Initializing database...');

  await initializeDatabase();

  console.log('Database ready');
}
