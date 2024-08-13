export const CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE = 'CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE';

export interface ICreatePhysicalPersonService {

   register: (data: any) => Promise<any>;

}