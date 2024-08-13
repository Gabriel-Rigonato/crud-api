import { Inject, Injectable } from "@nestjs/common";
import { IPhysicalPersonRepository, PHYSICAL_PERSON_REPOSITORY_INTERFACE } from "../interfaces/repositories/iphysical-person.repository";
import { IFetchPhysicalPersonService } from "../interfaces/services/ifetch-physical-person.service";

@Injectable()
export class FetchPhysicalPersonService implements IFetchPhysicalPersonService {

   constructor(
      @Inject(PHYSICAL_PERSON_REPOSITORY_INTERFACE)
      private readonly iPhysicalPersonRepository: IPhysicalPersonRepository

   ) { }

   async getByDocument(document: any): Promise<object | null> {

      const physicalPerson = await this.iPhysicalPersonRepository.findByDocument(document);

      return physicalPerson;
   }

}