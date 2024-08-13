import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ICreateTaskService } from "../interfaces/services/icreate-task.service";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../interfaces/repositories/iphysical-person.repository";
import { FETCH_USER_SERVICE_INTERFACE, IFetchUserService } from "src/modules/user/interfaces/services/ifetch-user.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";

@Injectable()
export class CreateTaskService implements ICreateTaskService {

   constructor(
      @Inject(TASK_REPOSITORY_INTERFACE)
      private readonly iTaskRepository: ITaskRepository,

      @Inject(FETCH_USER_SERVICE_INTERFACE)
      private readonly iFetchUserService: IFetchUserService
   ) { }

   async create(data: any, userUuid: string): Promise<any> {

      const user = await this.iFetchUserService.getByUuid(userUuid);

      if(!user){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found an user to create tasks.',
            'Não foi encontrado um usuário para criar uma tarefa.'
         )
      }

      const formattedData = {
         title: data.title,
         description: data.description,
         user_id:user.id
      }

      try {

         const task = await this.store("task", formattedData);

         return task;

      } catch (err) {
         console.log(err)
         throw new ApplicationException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            '002',
            'Internal server error.',
            'Não foi possivel gerar uma tarefa agora.'
         )
      }
   }

   async store(entity: string, data: any) {

      const task = await this.iTaskRepository.create(entity, data);

      return task;
   }
}