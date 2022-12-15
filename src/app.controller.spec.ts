import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    appController = app.get<AppController>(AppController);
    prisma = app.get(PrismaService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  
  describe('getArticles', () => {
    it('should return an array of cats', async () => {
      const testArticles = [{
        "id": 1,
        "title": "Prisma Adds Support for MongoDB",
        "description": "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
        "body": "Support for MongoDB has been one of the most requested features since the initial release of...",
        "published": false,
        "createdAt": "2022-12-14T01:52:43.022Z",
        "updatedAt": null
      }];

      jest.spyOn(appController, 'getArticles').mockImplementation(() => testArticles)
      // expect(await appController.getArticles().toBe(testArticles))
    })
  })
});
