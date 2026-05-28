export interface ApiError {
  message: string;
  statusCode: number;
  data?: any;
}

export interface NetworkError {
  message: string;
  code?: string;
}

export type AppError = Error | ApiError | NetworkError | string | unknown;
