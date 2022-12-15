import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateArticleDto } from './dto/create.dto';
import { EditArticleDto } from './dto/edit-article.dto';
import { PrismaService } from './prisma/prisma.service';

@ApiTags('App Service')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('article')
  @ApiOperation({ summary: 'Get All Article' })
  getArticles(): any {
    return this.appService.getArticles()
  }

  @Post('article/create')
  @ApiOperation({ summary: 'Create Article' })
  @ApiCreatedResponse({ description: 'Berhasil Membuat', type: CreateArticleDto})
  @ApiResponse({ status: 400, description: 'Article Successfully Created ...' })
  async createArticle(@Body() body: CreateArticleDto): Promise<CreateArticleDto> {
    return await this.appService.createArticle(body)
  }

  @Put('article/edit/:id')
  @ApiOperation({ summary: 'Edit Spesifik Article with ID' })
  editArticle(
    @Param('id') id: number,
    @Body() editArticle: EditArticleDto
  ) {
    return this.appService.editArticle(Number(id), editArticle)
  }

  @Delete('article/delete/:id')
  deleteArticle(@Param('id') id: number) {
    return this.appService.deleteArticle(Number(id))
  }




}
