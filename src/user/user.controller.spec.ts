import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let fakeUsersService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;
  let date = new Date();

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({id, username: 'email@email.com', password: 'password', createdAt: date, updatedAt: date} as User);
      },
      find: (username: string) => {
        return Promise.resolve([{id: 1, username , password: 'password', createdAt: date, updatedAt: date} as User]);
      },
      // remove: (id: number) => {
      //   return Promise.resolve({id, username: 'email@email.com', password: 'password', createdAt: date, updatedAt: date} as User);
      // },
      // update: () => {}
    };

    fakeAuthService = {
      // signUp: () => {},
      signin: (username: string, password: string) => {
        return Promise.resolve({id:1, username, password} as User);
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser', async () => {
    const user = await controller.findUserbyId('1');
    expect(user).toBeDefined();
  })

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUserbyId('1')).rejects.toThrow(NotFoundException);
  })

  it( 'signin', async () => {
    const session = {userId: 999};
    const user = await controller.signin(
      {
        username: 'email@email.com',
        password: 'password'
      },
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })

});
