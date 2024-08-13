import { Module } from "@nestjs/common";
import { UserHttpModule } from "./user/user-http.module";

@Module({
   imports: [
      UserHttpModule
   ]
})

export class HttpModule { }