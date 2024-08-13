
export const DELETE_TASK_SERVICE_INTERFACE = 'DELETE_TASK_SERVICE_INTERFACE';

export interface IDeleteTaskService {

   delete: (taskUuid: string, userUuid: string) => Promise<any>;
}