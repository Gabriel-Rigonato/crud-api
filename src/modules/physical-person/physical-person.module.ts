import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { PHYSICAL_PERSON_REPOSITORY_INTERFACE } from "./interfaces/repositories/iphysical-person.repository";
import { PhysicalPersonRepository } from "./repositories/physical-person.repository";
import { CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE } from "./interfaces/services/icreate-physical-person.service";
import { CreatePhysicalPersonService } from "./services/create-physical-person.service";
import { FetchPhysicalPersonService } from "./services/fetch-physical-person.service";
import { FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE } from "./interfaces/services/ifetch-physical-person.service";


@Module({
   imports: [
      CoreModule
   ],
   providers: [
      { provide: PHYSICAL_PERSON_REPOSITORY_INTERFACE, useClass: PhysicalPersonRepository },

      { provide: CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE, useClass: CreatePhysicalPersonService },
      {provide: FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE, useClass: FetchPhysicalPersonService}
   ],
   exports: [
      PHYSICAL_PERSON_REPOSITORY_INTERFACE,

      CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE,
      FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE

   ]
})

export class PhysicalPersonModule { }