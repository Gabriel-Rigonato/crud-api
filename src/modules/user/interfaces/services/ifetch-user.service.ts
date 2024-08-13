export const FETCH_USER_SERVICE_INTERFACE = 'FETCH_USER_SERVICE_INTERFACE';

export interface IFetchUserService {

   getByUuid: (data: any) => Promise<any>;
}