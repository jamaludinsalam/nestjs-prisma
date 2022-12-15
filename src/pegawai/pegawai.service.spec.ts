import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { PegawaiService } from './pegawai.service';

describe('PegawaiService', () => {
  let service: PegawaiService;
  let prisma: PrismaService;

  const pegawaiArray = [
    { id: 1, name: 'Jamaludin Salam', phone: '0887873883', address: 'Gandul Depok Jawa Barat'},
    { id: 2, name: 'Iranti Syafriana', phone: '08133333883', address: 'Kemang Jakarta Selatan'},
    { id: 3, name: 'Richar Podolski', phone: '08572333883', address: 'Depok Jakarta Selatan'},
  ]

  const onePegawai = pegawaiArray[0];

  const db = {
    pegawai: {
      findMany: jest.fn().mockResolvedValue(pegawaiArray),
      findUnique: jest.fn().mockResolvedValue(onePegawai),
      findFirst: jest.fn().mockResolvedValue(onePegawai),
      create: jest.fn().mockReturnValue(onePegawai),
      save: jest.fn(),
      update: jest.fn().mockResolvedValue(onePegawai),
      delete: jest.fn().mockResolvedValue(onePegawai),
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PegawaiService,
        {
          provide: PrismaService,
          useValue: db
        }
      ],
    }).compile();

    service = module.get<PegawaiService>(PegawaiService);
    prisma = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
