import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;
  let date = new Date();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request)', () => {
    const username = 'email@emailtest2.com';
    return request(app.getHttpServer())
    
      .post('/auth/signup')
      .send({username, password: 'password', createdAt: date, updatedAt: date})
      .expect(201)
      .then((res) => {
        const {id, username} = res.body;
        expect(id).toBeDefined();
        expect(username).toEqual(username);
      })
  });
});
