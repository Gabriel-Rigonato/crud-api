export const CREATE_TASK_SERVICE_INTERFACE = 'CREATE_TASK_SERVICE_INTERFACE';

export interface ICreateTaskService {

   create: (data: any,  userUuid: string) => Promise<any>;

}