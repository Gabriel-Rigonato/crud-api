import { IBaseRepository } from "src/modules/core/base/interfaces/ibase.repository";

export const TASK_REPOSITORY_INTERFACE = 'TASK_REPOSITORY_INTERFACE';

export interface ITaskRepository extends IBaseRepository {

    findMany: (filters: any, userId: number) => Promise<any>;

    findByUuid: (uuid: string) => Promise<any>;

    delete(uuid: string);

}