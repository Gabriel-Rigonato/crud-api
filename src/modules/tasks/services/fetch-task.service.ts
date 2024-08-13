import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IFetchTaskService } from "../interfaces/services/ifetch-task.service";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../interfaces/repositories/iphysical-person.repository";
import { FETCH_USER_SERVICE_INTERFACE, IFetchUserService } from "src/modules/user/interfaces/services/ifetch-user.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";

@Injectable()
export class FetchTaskService implements IFetchTaskService {

   constructor(
      @Inject(TASK_REPOSITORY_INTERFACE)
      private readonly iTaskRepository: ITaskRepository,

      @Inject(FETCH_USER_SERVICE_INTERFACE)
      private readonly iFetchUserService: IFetchUserService
   ) { }

   async getMany(filters: any, userUuid: string): Promise<any> {

      if(filters == undefined || filters.length == 0 || filters == null){
         filters = undefined
      }

      const user = await this.iFetchUserService.getByUuid(userUuid);

      if(!user){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found an user to list tasks.',
            'Não foi encontrado um usuário para listar as tarefas.'
         )
      }

      const tasks = await this.iTaskRepository.findMany(filters, user.id);

      return tasks;
   }

   async getByUuid(uuid: string, userUuid: string): Promise<any> {

      const user = await this.iFetchUserService.getByUuid(userUuid);

      if(!user){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found an user to see details from task.',
            'Não foi encontrado um usuário para ver os detalhes da tarefa.'
         )
      }

      const task = await this.iTaskRepository.findByUuid(uuid);


      if(!task){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found a task',
            'Não foi encontrado a tarefa.'
         )
      }
      return task;
   }

}