import { Inject, Injectable } from "@nestjs/common";
import { IPhysicalPersonRepository, PHYSICAL_PERSON_REPOSITORY_INTERFACE } from "../interfaces/repositories/iphysical-person.repository";
import { ICreatePhysicalPersonService } from "../interfaces/services/icreate-physical-person.service";

@Injectable()
export class CreatePhysicalPersonService implements ICreatePhysicalPersonService {

   constructor(
      @Inject(PHYSICAL_PERSON_REPOSITORY_INTERFACE)
      private readonly iPhysicalPersonRepository: IPhysicalPersonRepository

   ) { }

   async register(data: any): Promise<any> {

      const formattedData = {
         document: data.document,
         name: data.name,
         phone: data?.phone
      }

      try {

         const physicalPerson = await this.store("physical_person", formattedData);

         return physicalPerson;

      } catch (err) {
         console.log("err", err);
      }
   }

   async store(entity: string, data: any) {

      const physicalPerson = await this.iPhysicalPersonRepository.create(entity, data);

      return physicalPerson;
   }
}