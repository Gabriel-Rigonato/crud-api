export const AUTH_SERVICE_INTERFACE = "AUTH_SERVICE_INTERFACE";

export interface IAuthService {

   signin: (data: any) => Promise<any>;
}