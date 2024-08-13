import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/modules/core/base/repositories/base.repository";
import { PrismaService } from "src/modules/core/prisma/prisma.service";
import { ITaskRepository } from "../interfaces/repositories/iphysical-person.repository";


@Injectable()
export class TaskRepository extends BaseRepository implements ITaskRepository {

   constructor(
      prismaService: PrismaService
   ) {
      super(prismaService)
   }


   async findMany(filters: any, userId: number): Promise<any>{

      const tasks = await this.prismaService.task.findMany({
         where:{
            user_id: userId,
            active: true,
            AND:{
               status: filters
            }
         },
         select:{
            uuid: true,
            title: true,
            description: true,
            status: true
         },
         orderBy:{
            id: 'desc'
         }
      });

      return tasks;
   }

   async findByUuid(uuid: string): Promise<any>{

      const task = await this.prismaService.task.findFirst({
         where:{
            uuid: uuid,
            active: true,
         },
         select:{
            uuid: true,
            title: true,
            description: true,
            user_id: true,
            status: true,  
            created_at: true,
            updated_at: true
         }
      });

      return task;
   }

   async delete(uuid: string) {
      const entityUpdated = await this.prismaService.task.update({
          where:{
              uuid: uuid
          },
          data: {
             active: false
          },
          select:{
            uuid: true,
            active: true,
            title: true
          }
      });

      return entityUpdated;
  }

}