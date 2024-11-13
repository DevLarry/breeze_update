import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // let result = super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        // request.session
        return request.user as boolean;
    }
}