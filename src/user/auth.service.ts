import { Injectable, BadRequestException, NotFoundException} from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signUp(username: string, password: string, createdAt: Date, updatedAt: Date){
        // existing email
        const users = await this.userService.find(username);
        if(users.length){
            throw new BadRequestException('Existing username!');
        
        }
        //hash the user password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        //create and save
        const user = await this.userService.create(username, result, createdAt, updatedAt);
        //return user
        return user;
    }

    async signin(username: string, password: string){
        const [user] = await this.userService.find(username);
        if (!user){
            throw new NotFoundException('user not found!')
        }

        const[salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash === hash.toString('hex')){
            return user;
        } else {
            throw new BadRequestException('Wrong password')
        }
         
    }
}