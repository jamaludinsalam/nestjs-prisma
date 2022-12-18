import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllUserDto } from './dto/get-all-user.dto';
import { User } from './entities/user.entity';
import { GetUserIdDto } from './dto/get-user-id.dto';
import excludeUserField from 'src/common/serializer/exluding-field-user.serializer';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  /**
   * 
   * @returns 
   */
  findAll(): Promise<GetAllUserDto[]> {
    const getAll =  this.prisma.user
      .findMany()
      .then((users: Object[]) => plainToInstance(GetAllUserDto, users))
    return getAll
  }

  async findOne(id: number): Promise<GetUserIdDto> {
    return  await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    .then((user: Object) => plainToClass(GetUserIdDto, user))
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
