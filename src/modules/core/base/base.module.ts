import { Module } from "@nestjs/common";
import { BASE_REPOSITORY_INTERFACE } from "./interfaces/ibase.repository";
import { BaseRepository } from "./repositories/base.repository";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
   imports: [
      PrismaModule
   ],
   providers: [
      { provide: BASE_REPOSITORY_INTERFACE, useClass: BaseRepository }
   ]
})

export class BaseModule { }