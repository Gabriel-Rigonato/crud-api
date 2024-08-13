import { IBaseRepository } from "src/modules/core/base/interfaces/ibase.repository";

export const PHYSICAL_PERSON_REPOSITORY_INTERFACE = 'PHYSICAL_PERSON_REPOSITORY_INTERFACE';

export interface IPhysicalPersonRepository extends IBaseRepository {

    findByDocument: (document: string) => Promise<object | null>;
}