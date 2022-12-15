import { Module } from '@nestjs/common';
import { PegawaiService } from './pegawai.service';
import { PegawaiController } from './pegawai.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PegawaiController],
  providers: [PegawaiService]
})
export class PegawaiModule {}
