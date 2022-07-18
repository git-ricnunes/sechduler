import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UserDto } from './dto/userdto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{
    saltOrRounds = 11;

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async addUser(userDto: UserDto) : Promise<User> {
        const createdUser = new this.userModel(userDto);
        await bcrypt.genSalt(this.saltOrRounds, async function(err, salt) {
            await bcrypt.hash(userDto.password, salt, async function(err, hash) {
                createdUser.password=hash
                createdUser.save();
            });
        });
    return createdUser

    }

    async deleteUser(uname:string) : Promise<string>{
        this.userModel.findOneAndDelete({ username: uname }).exec()
        return uname
    }

    async findUser(uname:string): Promise<User> {
        return this.userModel.findOne({ username: uname }).exec()
      }

    async findUsers(): Promise<User[]> {
        return this.userModel.find().exec();
      }

    async loginUser(username: string, password: string) : Promise<User> {
        const userBD = await this.userModel.findOne({ username: username }).exec()   
        if(!await bcrypt.compare(password, userBD.password))
            return null
        return userBD 
    }
}