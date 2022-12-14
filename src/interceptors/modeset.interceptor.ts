import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ModesetInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('test before ctrlr');

    return next.handle().pipe(
      map((data) => ({
        success: context.switchToHttp().getResponse().statusCode,
        modeset: data,
      })),
    );
  }
}
