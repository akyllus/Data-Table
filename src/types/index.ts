// Common interfaces
export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export interface SortParams {
    field: string;
    direction: 'asc' | 'desc';
  }
  
  export interface FilterParams {
    [key: string]: string | number | boolean | null;
  }
  
  // Example entity interfaces
  export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface QueryParams extends PaginationParams {
    sort?: SortParams;
    filters?: FilterParams;
    search?: string;
  }
  
  export interface ApiError {
    message: string;
    code: string;
    details?: Record<string, any>;
  }