import { z } from 'zod';

/**
 * @summary Common Zod validation schemas
 * @description Reusable validation schemas for common data types
 */

/**
 * @summary String validation with max length
 */
export const zString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema;
};

/**
 * @summary Nullable string validation
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive();

/**
 * @summary Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary BIT field validation (0 or 1)
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * @summary Date string validation
 */
export const zDateString = z.string().datetime();

/**
 * @summary Email validation
 */
export const zEmail = z.string().email().max(255);

/**
 * @summary Phone validation
 */
export const zPhone = z.string().max(20);

/**
 * @summary URL validation
 */
export const zUrl = z.string().url().max(500);

/**
 * @summary Decimal validation (15,2)
 */
export const zDecimal = z.number();

/**
 * @summary Price validation (18,6)
 */
export const zPrice = z.number();
