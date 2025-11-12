/**
 * @summary Global type definitions
 * @description Common types used across the application
 */

/**
 * @interface ICreateObjectResult
 * @description Standard result for create operations
 */
export interface ICreateObjectResult {
  id: number;
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 */
export interface IRecordSet<T = any> {
  recordset: T[];
  rowsAffected: number[];
}

/**
 * @enum ExpectedReturn
 * @description Expected return types for database operations
 */
export enum ExpectedReturn {
  Single = 'single',
  Multi = 'multi',
  None = 'none',
}
