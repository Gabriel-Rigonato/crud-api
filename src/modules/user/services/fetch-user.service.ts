import { Inject, Injectable } from "@nestjs/common";
import { IFetchUserService } from "../interfaces/services/ifetch-user.service";
import { IUserRepository, USER_REPOSITORY_INTERFACE } from "../interfaces/repositories/iuser.repository";

@Injectable()
export class FetchUserService implements IFetchUserService {

   constructor(
      @Inject(USER_REPOSITORY_INTERFACE)
      private readonly iUserRepository: IUserRepository

   ) { }

   async getByUuid(uuid: any): Promise<object | null> {

      const user = await this.iUserRepository.findByUuid(uuid);

      return user;
   }

}