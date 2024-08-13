import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import {IUserRepository, USER_REPOSITORY_INTERFACE } from "../interfaces/repositories/iuser.repository";
import { CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE, ICreatePhysicalPersonService } from "src/modules/physical-person/interfaces/services/icreate-physical-person.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { HashPassword } from "src/modules/core/utils/utils";
import { ICreateUserService } from "../interfaces/services/icreate-user.service";
import { FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE, IFetchPhysicalPersonService } from "src/modules/physical-person/interfaces/services/ifetch-physical-person.service";

@Injectable()
export class CreateUserService implements ICreateUserService {

   constructor(
      @Inject(USER_REPOSITORY_INTERFACE)
      private readonly iUserRepository: IUserRepository,

      @Inject(CREATE_PHYSICAL_PERSON_SERVICE_INTERFACE)
      private readonly iCreatePhysicalPersonService: ICreatePhysicalPersonService,
      @Inject(FETCH_PHYSICAL_PERSON_SERVICE_INTERFACE)
      private readonly iFetchPhysicalPersonService: IFetchPhysicalPersonService
   ) { }

   async register(data: any): Promise<object> {

      await this.validateDocuments(data);
   
      const physicalPersonRegistered = await this.iCreatePhysicalPersonService.register(data);

      if (!physicalPersonRegistered) {
         throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            '001',
            `Bad Request. Data was incorrect.`,
            `Má requisição. Dados inválidos ao criar uma pessoa fisica.`
         );
      }

      const hashedPassword = await HashPassword(data.password);

      const formattedData = {
         username: data.username,
         password: hashedPassword,
         physical_person_id: physicalPersonRegistered.id,
      }
      try {

         const user = await this.store('user', formattedData);

         return user;

      } catch (err) {

         throw new ApplicationException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            '002',
            'Internal server error.',
            'Não foi possivel gerar um usuário.'
         )
      }
   }

   async store(entity: string, data: object) {

      const user = await this.iUserRepository.create(entity, data);

      return user;
   }

   async validateDocuments(data: any){

      const physicalPersonExists = await this.iFetchPhysicalPersonService.getByDocument(data.document);

      if(physicalPersonExists !== null){
         throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            '001',
            `Bad Request. This Document exists.`,
            `Má requisição. Este documento já está registrado.`
         );
      }

      const userExists = await this.iUserRepository.findByUsername(data.username);

      if(userExists){
         throw new ApplicationException(
            HttpStatus.BAD_REQUEST,
            '001',
            `Bad Request. This user exists.`,
            `Má requisição. Este usuário já está registrado.`
         );
      }
      
   }
}