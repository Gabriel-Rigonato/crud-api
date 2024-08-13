export const UPDATE_TASK_SERVICE_INTERFACE = 'UPDATE_TASK_SERVICE_INTERFACE';

export interface IUpdateTaskService {
   update: (data: any,  userUuid: string,  taskUuid: string) => Promise<any>;
}