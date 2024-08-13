import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { IBaseRepository } from "../interfaces/ibase.repository";


@Injectable()
export class BaseRepository implements IBaseRepository {

    constructor(
         readonly prismaService: PrismaService,
    ) { }

    async create(entity: string, data: any) {
        const entityCreated = await this.prismaService[entity].create({
            data: {
                ...data
            }
        });

        return entityCreated;
    }

    async update(entity: string, data: any) {
        const entityUpdated = await this.prismaService[entity].update({
            where:{
                uuid: data.uuid
            },
            data: {
                ...data
            }
        });

        return entityUpdated;
    }


    async findByUuid(uuid: string): Promise<any>{}
}