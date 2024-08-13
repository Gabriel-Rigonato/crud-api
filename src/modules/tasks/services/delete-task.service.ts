import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FETCH_TASK_SERVICE_INTERFACE, IFetchTaskService } from "../interfaces/services/ifetch-task.service";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../interfaces/repositories/iphysical-person.repository";
import { FETCH_USER_SERVICE_INTERFACE, IFetchUserService } from "src/modules/user/interfaces/services/ifetch-user.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { IDeleteTaskService } from "../interfaces/services/idelete-task.service";

@Injectable()
export class DeleteTaskService implements IDeleteTaskService {

   constructor(
      @Inject(TASK_REPOSITORY_INTERFACE)
      private readonly iTaskRepository: ITaskRepository,

      @Inject(FETCH_USER_SERVICE_INTERFACE)
      private readonly iFetchUserService: IFetchUserService,
   ) { }

   async delete(uuid: string, userUuid: string): Promise<any> {

      const user = await this.iFetchUserService.getByUuid(userUuid);

      if(!user){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found an user to delete task.',
            'Não foi encontrado um usuário para excluir a tarefa.'
         )
      }

      const task = await this.iTaskRepository.findByUuid(uuid);

      if(!task){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found a task.',
            'Não foi encontrada uma tarefa.'
         )
      }

      const taskDeleted = await this.iTaskRepository.delete(task.uuid);

      return taskDeleted;
   }

}