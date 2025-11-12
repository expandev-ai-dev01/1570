/**
 * @summary Success response interface
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

/**
 * @summary Error response interface
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary Creates a standardized success response
 *
 * @param data Response data
 * @param metadata Optional metadata (pagination, etc.)
 * @returns Formatted success response
 */
export function successResponse<T>(
  data: T,
  metadata?: Partial<SuccessResponse<T>['metadata']>
): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary Creates a standardized error response
 *
 * @param message Error message
 * @param code Error code
 * @param details Optional error details
 * @returns Formatted error response
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  details?: any
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}
