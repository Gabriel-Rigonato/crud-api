export const BASE_REPOSITORY_INTERFACE = 'BASE_REPOSITORY_INTERFACE';

export interface IBaseRepository {

    create : (entity: string, data: any) => Promise<any>;

    update : (entity: string, data: any) => Promise<any>;

    findByUuid : (uuid: string) => Promise<any>;

}