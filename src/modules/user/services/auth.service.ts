import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ComparePassword } from "src/modules/core/utils/utils";
import { JwtService } from "@nestjs/jwt";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { USER_REPOSITORY_INTERFACE, IUserRepository } from "../interfaces/repositories/iuser.repository.js";
import { IAuthService } from "../interfaces/services/iauth-service.ts.js";

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @Inject(USER_REPOSITORY_INTERFACE)
        private readonly iUserRepository: IUserRepository,

        private readonly jwtService: JwtService
    ){}

    async signin(data: any): Promise<any>{
        const user = await this.iUserRepository.findByUsername(data.username);

        if(user){

            if(await ComparePassword(data.password, user.password)){

                return this.generateToken(user);
                
            } else {
                throw new ApplicationException(
                    HttpStatus.BAD_REQUEST,
                    '001',
                    'Bad request. User or password was incorrect.',
                    'Má requisição. Usuário ou senha incorretos'
                )
            }

        } else {
            throw new ApplicationException(
                HttpStatus.BAD_REQUEST,
                '001',
                'Bad request. User or password was incorrect.',
                'Má requisição. Usuário ou senha incorretos'
            )
        }
    }

    async generateToken(user: any): Promise<object>{

        const payload = { sub: user.uuid, username: user.username };

                return {
                  uuid: user.uuid,  
                  username: user.username,  
                  access_token: await this.jwtService.signAsync(payload),
                };
    }
}