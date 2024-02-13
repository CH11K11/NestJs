import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let fakeUsersService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // fakeUsersService = {
    //   findOne: () => {},
    //   find: () => {},
    //   remove: () => {},
    //   update: () => {}
    // };

    // fakeAuthService = {
    //   signUp: () => {},
    //   signin: () => {}
    // };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
