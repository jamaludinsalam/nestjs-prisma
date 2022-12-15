import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PegawaiModule } from './pegawai/pegawai.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, PegawaiModule, ArticlesModule, UsersModule, PostsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
