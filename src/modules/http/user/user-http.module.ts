import { Module } from "@nestjs/common";
import { RegisterController } from "./controllers/register.controller";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "./controllers/auth.controller";
import { TaskModule } from "src/modules/tasks/task.module";
import { TaskController } from "./controllers/task.controller";

@Module({
   imports: [
      UserModule,
      TaskModule
   ],
   controllers: [
      RegisterController,
      AuthController,
      TaskController
   ]
})

export class UserHttpModule { }