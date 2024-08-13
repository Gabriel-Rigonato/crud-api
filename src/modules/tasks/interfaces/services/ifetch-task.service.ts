
export const FETCH_TASK_SERVICE_INTERFACE = 'FETCH_TASK_SERVICE_INTERFACE';

export interface IFetchTaskService {

   getMany: (filters: string, userUuid: string) => Promise<any>;

   getByUuid: (uuid: string, userUuid: string) => Promise<any>;
}