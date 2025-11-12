import sql from 'mssql';
import { config } from '@/config';

let pool: sql.ConnectionPool | null = null;

/**
 * @summary Gets or creates database connection pool
 * @description Implements singleton pattern for database connections
 *
 * @returns Promise<sql.ConnectionPool> Database connection pool
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    try {
      pool = await sql.connect({
        server: config.database.server,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        options: config.database.options,
        pool: config.database.pool,
      });

      console.log('Database connection established');

      pool.on('error', (err) => {
        console.error('Database pool error:', err);
        pool = null;
      });
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  return pool;
}

/**
 * @summary Closes database connection pool
 * @description Gracefully closes all database connections
 */
export async function closePool(): Promise<void> {
  if (pool) {
    try {
      await pool.close();
      pool = null;
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
}
