import { Controller, Post , Get, Body, Query, Delete } from "@nestjs/common";
import { UserDto } from "./dto/userdto";
import { UsersService } from "./users.service";

@Controller('user')
export class UserController{

    constructor(private readonly usersService: UsersService ){}

    @Post("add")
    async addUser(@Body() userdto: UserDto ) : Promise<any> {
        const user = await this.usersService.addUser(userdto)
        return {message: "User " + user.username +" created" }
        }

    @Post("login")
    async loginUser(
        @Body('username') username: string,
        @Body('password') password: string
        ) : Promise<any> {
        if( await this.usersService.loginUser(username,password) === null )
            return {message: "Credentials invalid" }
        return {message: "Credentials valid"}
        }

    @Get()
    async getUser(
        @Query('username') username: string
        ) : Promise<any> {
            return this.usersService.findUser(username)
        }

    @Get("list")
    async geAlltUser() : Promise<any> {
        return this.usersService.findUsers()
        }

    @Delete("remove")
    async removeUser(
        @Query('username') username: string
    ) : Promise<any> {
        return this.usersService.deleteUser(username)

        }

}
