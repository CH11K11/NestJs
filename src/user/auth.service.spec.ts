import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";

describe('AuthService', () => {

    let service: AuthService;
    let fakeUsersService: Partial<UserService>;
    let date = new Date();
    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (username: string) => {
                const filteredUsers = users.filter(user => user.username === username);
                return Promise.resolve(filteredUsers);
            },
            create: (username: string, password: string, createdAt: Date, updatedAt: Date) => {
                const user = {id: Math.floor(Math.random()* 999999999),username, password, createdAt, updatedAt} as User;
                users.push(user);
                return Promise.resolve(user);
            }

        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    });
    it('test' , async ()=> {
        
        expect(service).toBeDefined();
    });

    it( 'test signup', async ()=> {
        const user = await service.signUp('email@email.com', 'password', date, date);

        expect(user.password).not.toEqual('password');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        await service.signUp('email@email.com', 'password', date, date);
        await expect(service.signUp('email@email.com', 'password', date, date)).rejects.toThrow(
            BadRequestException,
        );
    });
    
    it('throws if signin is called with an unused email', async () => {
        await expect(
        service.signin('email@email.com', 'password'),
        ).rejects.toThrow(NotFoundException);
    });
        
    it('throws if an invalid password is provided', async () => {
        await service.signUp('email@email.com', 'password', date, date);

        await expect(service.signin('email@email.com', 'password1'),).rejects.toThrow(BadRequestException);
    });

    it('return a user if correct password is provided', async () => {
        await service.signUp('email@email.com', 'password', date, date);

        const user = await service.signin('email@email.com', 'password');
        expect(user).toBeDefined();
    });
});

