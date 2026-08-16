import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        // If data already has structured format, return as is
        if (data && typeof data === 'object' && 'data' in data && 'success' in data) {
          return data;
        }

        // Handle pagination meta if provided as { items, meta }
        if (data && typeof data === 'object' && 'items' in data && 'meta' in data) {
          return {
            success: true,
            statusCode: response.statusCode || 200,
            data: data.items,
            meta: data.meta,
          };
        }

        return {
          success: true,
          statusCode: response.statusCode || 200,
          data,
        };
      }),
    );
  }
}
