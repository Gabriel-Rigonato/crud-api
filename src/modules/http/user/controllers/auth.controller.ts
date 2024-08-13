import { Body, Controller, Inject, Post, } from "@nestjs/common";
import { AUTH_SERVICE_INTERFACE, IAuthService } from "src/modules/user/interfaces/services/iauth-service.ts";

@Controller('user/auth')
export class AuthController {

   constructor(
      @Inject(AUTH_SERVICE_INTERFACE)
      private readonly iAuthService: IAuthService
   ) { }


   @Post('/signin')
   async signin(@Body() data: any): Promise<any> {

      const credentialsChecked = await this.iAuthService.signin(data);

      return credentialsChecked;
   }

}