import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard extends AuthGuard {
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const can = await super.canActivate(context);
        const request = context.switchToHttp();
        if (can && request.getRequest().user.role === "ADMIN") {
            return true;
        }
        return false;
    }
}
