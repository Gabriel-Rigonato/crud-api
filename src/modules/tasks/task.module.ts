import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { TASK_REPOSITORY_INTERFACE } from "./interfaces/repositories/iphysical-person.repository";
import { TaskRepository } from "./repositories/task.repository";
import { CREATE_TASK_SERVICE_INTERFACE } from "./interfaces/services/icreate-task.service";
import { CreateTaskService } from "./services/create-task.service";
import { FETCH_TASK_SERVICE_INTERFACE } from "./interfaces/services/ifetch-task.service";
import { FetchTaskService } from "./services/fetch-task.service";
import { UserModule } from "../user/user.module";
import { UPDATE_TASK_SERVICE_INTERFACE } from "./interfaces/services/iupdate-task.service";
import { UpdateTaskService } from "./services/update-task.service";
import { DELETE_TASK_SERVICE_INTERFACE } from "./interfaces/services/idelete-task.service";
import { DeleteTaskService } from "./services/delete-task.service";

@Module({
    imports:[
        CoreModule,
        UserModule
    ],
    providers:[
        {provide: TASK_REPOSITORY_INTERFACE, useClass: TaskRepository},

        {provide: CREATE_TASK_SERVICE_INTERFACE, useClass: CreateTaskService},
        {provide: FETCH_TASK_SERVICE_INTERFACE, useClass: FetchTaskService},
        {provide: UPDATE_TASK_SERVICE_INTERFACE, useClass: UpdateTaskService},
        {provide: DELETE_TASK_SERVICE_INTERFACE, useClass: DeleteTaskService},
        
    ],
    exports:[
        TASK_REPOSITORY_INTERFACE,

        CREATE_TASK_SERVICE_INTERFACE,
        FETCH_TASK_SERVICE_INTERFACE,
        UPDATE_TASK_SERVICE_INTERFACE,
        DELETE_TASK_SERVICE_INTERFACE
    ]
})

export class TaskModule {}