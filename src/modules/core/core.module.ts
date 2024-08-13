import { Module } from "@nestjs/common";
import { BaseModule } from "./base/base.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
   imports: [
      BaseModule,
      PrismaModule,
   ],
   exports: [
      BaseModule,
      PrismaModule,
   ]
})

export class CoreModule { }