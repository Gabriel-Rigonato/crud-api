
export const FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE = 'FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE';

export interface IFetchPhysicalPersonService {

   getByDocument: (document: string) => Promise<object | null>;
}