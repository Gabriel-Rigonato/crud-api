import { Module } from "@nestjs/common";
import { PhysicalPersonModule } from "../physical-person/physical-person.module";
import { CoreModule } from "../core/core.module";
import { CREATE_USER_SERVICE_INTERFACE } from "./interfaces/services/icreate-user.service";
import { CreateUserService } from "./services/create-user.service";
import { USER_REPOSITORY_INTERFACE } from "./interfaces/repositories/iuser.repository";
import { UserRepository } from "./repositories/user.repository";
import { AUTH_SERVICE_INTERFACE } from "./interfaces/services/iauth-service.ts";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { FETCH_USER_SERVICE_INTERFACE } from "./interfaces/services/ifetch-user.service";
import { FetchUserService } from "./services/fetch-user.service";

@Module({
   imports: [
      CoreModule,
      PhysicalPersonModule, 
      JwtModule.register({
         global: true,
         secret: process.env.JWT_SECRET,
         signOptions: { expiresIn:  process.env.JWT_EXPIRES_IN},
       }),
   ],
   providers: [      
      {provide: USER_REPOSITORY_INTERFACE, useClass: UserRepository},

      {provide: CREATE_USER_SERVICE_INTERFACE, useClass: CreateUserService},
      {provide: FETCH_USER_SERVICE_INTERFACE, useClass: FetchUserService},
      {provide: AUTH_SERVICE_INTERFACE, useClass: AuthService},

   ],
   exports: [
      USER_REPOSITORY_INTERFACE,

      CREATE_USER_SERVICE_INTERFACE,
      FETCH_USER_SERVICE_INTERFACE,
      AUTH_SERVICE_INTERFACE,
   ]
})

export class UserModule { }