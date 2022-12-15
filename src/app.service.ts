import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as moment from 'moment';
import { CreateArticleDto } from './dto/create.dto';
import { EditArticleDto } from './dto/edit-article.dto';
@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService
  ) {}


  getHello(): string {
    return 'Hello World!';
  }
 
  getArticles(): any {
    return this.prisma.article.findMany()
  }

  // getPostByUserId(): any {
  //   return this.prisma.
  // }



  
  /**
   * Service for Creating New Article
   * ================================
   * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
   * @param body 
   *  title,
   *  description,
   *  body,
   *  published
   * @abstract sacdasdasdsa
   * @returns 
   */
  async createArticle(body: CreateArticleDto): Promise<CreateArticleDto> {
    const article = await this.prisma.article.create({data: body})

    return article
  }

  /**
   * Service for Edit Article By ID
   * ================================
   * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
   * @param id number
   * @body body 
   *  title,
   *  description,
   *  body,
   *  published
   * @abstract sacdasdasdsa
   * @returns 
   */
    async editArticle(id: number, editArticle: EditArticleDto): Promise<EditArticleDto> {
      const article = await this.prisma.article.update({
        where: { id: id },
        data: editArticle
      })
  
      return article
    }



  /**
   * Service for Delete Article By ID
   * ================================
   * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
   * @param id number
   * @returns 
   */
    async deleteArticle(id: number): Promise<any> {
      const article = await this.prisma.article.delete({
        where: { id: id }
      })
  
      return article
    }


}
