import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./users.crontroller";
import { User, UserSchema } from "./schemas/users.schema";
import { UsersService } from "./users.service";

@Module({  
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers:[UserController],
    providers:[UsersService],

})
export class UserModule{}


