import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PegawaiService } from './pegawai.service';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';
import { ApiFoundResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Pegawai Service')
@Controller('pegawai')
export class PegawaiController {
  constructor(private readonly pegawaiService: PegawaiService) {}

  @Post()
  create(@Body() createPegawaiDto: CreatePegawaiDto) {
    return this.pegawaiService.create(createPegawaiDto);
  }

  @Get()
  findAll() {
    return this.pegawaiService.findAll();
  }


  @ApiFoundResponse({description: 'Ditemukan'})
  @ApiNotFoundResponse({description: 'Tidak Ditemukan'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pegawaiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePegawaiDto: UpdatePegawaiDto) {
    return this.pegawaiService.update(+id, updatePegawaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pegawaiService.remove(+id);
  }
}
