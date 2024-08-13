import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/modules/core/base/repositories/base.repository";
import { PrismaService } from "src/modules/core/prisma/prisma.service";
import { IUserRepository } from "../interfaces/repositories/iuser.repository";


@Injectable()
export class UserRepository extends BaseRepository implements IUserRepository {

   constructor(
      prismaService: PrismaService
   ) {
      super(prismaService)
   }

   async findByUsername (username: string): Promise<any> {

      const user = await this.prismaService.user.findFirst({
         select:{
            password: true,
            username: true,
            uuid: true
         },
         where:{
            username: username
         }
      });

      return user;
   }

   async findByUuid (uuid: string): Promise<any> {

      const user = await this.prismaService.user.findFirst({
         select:{
            id: true,
            uuid: true
         },
         where:{
            uuid: uuid
         }
      });

      return user;
   }
}