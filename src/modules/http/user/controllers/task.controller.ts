import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UseGuards, } from "@nestjs/common";
import { GetLoggedUser } from "src/modules/core/decorators/get-logged-user.decorator";
import { CreateTaskDto } from "src/modules/core/dtos/create-task.dto";
import { UpdateTaskDto } from "src/modules/core/dtos/update-task.dto";
import { AuthGuard } from "src/modules/core/guards/auth.guard";
import { CREATE_TASK_SERVICE_INTERFACE, ICreateTaskService } from "src/modules/tasks/interfaces/services/icreate-task.service";
import { DELETE_TASK_SERVICE_INTERFACE, IDeleteTaskService } from "src/modules/tasks/interfaces/services/idelete-task.service";
import { FETCH_TASK_SERVICE_INTERFACE, IFetchTaskService } from "src/modules/tasks/interfaces/services/ifetch-task.service";
import { IUpdateTaskService, UPDATE_TASK_SERVICE_INTERFACE } from "src/modules/tasks/interfaces/services/iupdate-task.service";

@Controller('user/tasks')
@UseGuards(AuthGuard)
export class TaskController {

   constructor(
      @Inject(CREATE_TASK_SERVICE_INTERFACE)
      private readonly iCreateTaskService: ICreateTaskService,
      @Inject(FETCH_TASK_SERVICE_INTERFACE)
      private readonly iFetchTaskService: IFetchTaskService,
      @Inject(UPDATE_TASK_SERVICE_INTERFACE)
      private readonly iUpdateTaskService: IUpdateTaskService,
      @Inject(DELETE_TASK_SERVICE_INTERFACE)
      private readonly iDeleteTaskService: IDeleteTaskService
   ) { }


   @Post('/')
   async create(@Body() data: CreateTaskDto, @GetLoggedUser() user: any): Promise<any> {

      const task = await this.iCreateTaskService.create(data, user.sub);

      return task;
   }

   @Get('/')
   async fetchList(@Query('status') status: string, @GetLoggedUser() user: any): Promise<any> {
      
      const tasks = await this.iFetchTaskService.getMany(status, user.sub);

      return tasks;
   }


   @Get('/details')
   async details(@Query('uuid') uuid: string, @GetLoggedUser() user: any): Promise<any> {

      const task = await this.iFetchTaskService.getByUuid(uuid, user.sub);
      
      return task;
   }

   @Put('/')
   async update(@Body() data: UpdateTaskDto, @GetLoggedUser() user: any, @Query('uuid') taskUuid: string): Promise<any> {

      const task = await this.iUpdateTaskService.update(data, user.sub, taskUuid);

      return task;
   }

   @Delete('/')
   async delete(@GetLoggedUser() user: any, @Query('uuid') taskUuid: string): Promise<any> {

      const taskDeleted = await this.iDeleteTaskService.delete(taskUuid, user.sub);

      return taskDeleted;
   }


}