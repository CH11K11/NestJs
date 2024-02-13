import { 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor{
    new (...args: any[]): {}
}

export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // code before the request
        return handler.handle().pipe(
            map(
                (data:any) =>{
                    // code after the request
                    return plainToClass(this.dto, data , {
                        excludeExtraneousValues: true,
                    });
                }
            )
        )
    }
}