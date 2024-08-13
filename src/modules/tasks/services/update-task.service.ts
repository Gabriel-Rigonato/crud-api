import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../interfaces/repositories/iphysical-person.repository";
import { FETCH_USER_SERVICE_INTERFACE, IFetchUserService } from "src/modules/user/interfaces/services/ifetch-user.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { IUpdateTaskService } from "../interfaces/services/iupdate-task.service";
import { FETCH_TASK_SERVICE_INTERFACE, IFetchTaskService } from "../interfaces/services/ifetch-task.service";
import { UpdateTaskDto } from "src/modules/core/dtos/update-task.dto";

@Injectable()
export class UpdateTaskService implements IUpdateTaskService {

   constructor(
      @Inject(TASK_REPOSITORY_INTERFACE)
      private readonly iTaskRepository: ITaskRepository,

      @Inject(FETCH_USER_SERVICE_INTERFACE)
      private readonly iFetchUserService: IFetchUserService,
      @Inject(FETCH_TASK_SERVICE_INTERFACE)
      private readonly iFetchTaskService: IFetchTaskService
   ) { }

   async update(data: UpdateTaskDto, userUuid: string, taskUuid: string): Promise<any> {

      const user = await this.iFetchUserService.getByUuid(userUuid);

      if(!user){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found an user to update task.',
            'Não foi encontrado um usuário para atualizar uma tarefa.'
         )
      }

      const task = await this.iFetchTaskService.getByUuid(taskUuid, userUuid);

      if(!task){
         throw new ApplicationException(
            HttpStatus.NOT_FOUND,
            '001',
            'Not found a task.',
            'Não foi encontrado uma tarefa.'
         )
      }

      const formattedData = {
         uuid: task.uuid,
         title: data?.title == "" ? task.title : data.title,
         description: data?.description == "" ? task.description : data.description,
         status: data?.status == "" ? task.status : data.status
      }
      try {

         const task = await this.save("task", formattedData);

         return task;

      } catch (err) {
         console.log(err)
         throw new ApplicationException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            '002',
            'Internal server error.',
            'Não foi possivel atualizar uma tarefa agora.'
         )
      }
   }

   async save(entity: string, data: any) {

      const task = await this.iTaskRepository.update(entity, data);

      return task;
   }
}