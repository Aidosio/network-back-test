import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/complexes (GET)', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .get('/api/complexes')
        .expect(200);
    });
  });

  describe('/api/applications (POST)', () => {
    it('should return 400 for invalid body', () => {
      return request(app.getHttpServer())
        .post('/api/applications')
        .send({})
        .expect(400);
    });

    it('should return 400 for invalid email', () => {
      return request(app.getHttpServer())
        .post('/api/applications')
        .send({
          apartmentId: '123e4567-e89b-12d3-a456-426614174000',
          firstName: 'Test',
          lastName: 'User',
          phone: '+77011234567',
          email: 'invalid-email',
          type: 'booking',
        })
        .expect(400);
    });
  });
});
