import { IBaseRepository } from "src/modules/core/base/interfaces/ibase.repository";

export const USER_REPOSITORY_INTERFACE = 'USER_REPOSITORY_INTERFACE';

export interface IUserRepository extends IBaseRepository {

    findByUsername :( data: any) => Promise<any>;

    findByUuid : (uuid: string)=> Promise<any>; 
}