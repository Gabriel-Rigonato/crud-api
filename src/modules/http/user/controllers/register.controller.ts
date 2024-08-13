import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "src/modules/core/dtos/create-user.dto";
import { CREATE_USER_SERVICE_INTERFACE, ICreateUserService } from "src/modules/user/interfaces/services/icreate-user.service";


@Controller('user')
export class RegisterController {

   constructor(
      @Inject(CREATE_USER_SERVICE_INTERFACE)
      private readonly iCreateUserService: ICreateUserService
   ) { }


   @Post('/register')
   async register(@Body() data: CreateUserDto): Promise<any> {
      
      const user = await this.iCreateUserService.register(data);

      return user;
   }

}