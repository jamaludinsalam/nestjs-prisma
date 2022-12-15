import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PegawaiController } from './pegawai.controller';
import { PegawaiService } from './pegawai.service';

describe('PegawaiController', () => {
  let controller: PegawaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PegawaiController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [
        {
          provide: PegawaiService,
          useValue: {
            
          }
        }
      ],
    })
      .compile();

    controller = module.get<PegawaiController>(PegawaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
