import { 
    Controller,
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Query, 
    Delete, 
    NotFoundException,
    Session,
    UseGuards
     
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from './guard/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
    
    constructor(
        private userService: UserService,
        private authService: AuthService
    ){}
    

    @Get('/whoami')
    whoAmI(@Session() session:any){
        return this.userService.findOne(session.userId);
    }
    
   @Serialize(UserDto)
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session:any){
        const user = await this.authService.signUp(body.username, body.password, body.createdAt, body.updatedAt);
        session.userId = user.id;
        return user;
    }

//    @Serialize(UserDto)
    @Post('/signin')
    async signin(@Body() body: SignInUserDto, @Session() session:any){
        const user = await this.authService.signin(body.username, body.password);
        session.userId = user.id;
        return user;
    }


    @Post('/signout')
    signout(@Session() session:any){
        session.userId = null;
    }


//    @Serialize(UserDto)
    @Get('/:id')
    async findUserbyId(@Param('id') id: string){
        console.log('test2');
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;

    }

//    @Serialize(UserDto)
    @Get()
    findAllUsers(@Query('username') username: string){
        return this.userService.find(username);
        
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id));
    }

//    @Serialize(UserDto)
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body);
    }

    



}
