import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/modules/core/base/repositories/base.repository";
import { PrismaService } from "src/modules/core/prisma/prisma.service";
import { IPhysicalPersonRepository } from "../interfaces/repositories/iphysical-person.repository";
import { physical_person } from "@prisma/client";


@Injectable()
export class PhysicalPersonRepository extends BaseRepository implements IPhysicalPersonRepository {

   constructor(
      prismaService: PrismaService
   ) {
      super(prismaService)
   }


   async findByDocument(document: string): Promise<object | null>{

      const physicalPerson = await this.prismaService.physical_person.findFirst({
         where:{
            document: document
         },
         select:{
            document: true,
            uuid: true
         }
      });

      return physicalPerson;
   }
}