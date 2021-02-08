import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";


@Injectable()
export class UserRoleGuard implements CanActivate {


    canActivate(
        context: ExecutionContext,
        ) : boolean | Promise<boolean>{

            const request = context.switchToHttp().getRequest();
            
            console.log(request.user);
            
            return  true;
        }

}