export const CREATE_USER_SERVICE_INTERFACE = 'CREATE_USER_SERVICE_INTERFACE';

export interface ICreateUserService {

   register: (data: any) => Promise<any>;
}