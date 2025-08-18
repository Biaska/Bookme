interface AppError {
  message: string;
}

export interface ApiResponse {
  data: any | null;
  error: AppError | null;
}
