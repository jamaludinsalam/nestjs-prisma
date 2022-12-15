import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';

@Injectable()
export class PegawaiService {
  constructor(
    private readonly prisma: PrismaService
  ) {}


  create(createPegawaiDto: CreatePegawaiDto) {
    return 'This action adds a new pegawai';
  }

  findAll() {
    return this.prisma.article.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} pegawai`;
  }

  update(id: number, updatePegawaiDto: UpdatePegawaiDto) {
    return `This action updates a #${id} pegawai`;
  }

  remove(id: number) {
    return `This action removes a #${id} pegawai`;
  }
}
