import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAuthDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createAuthDto });
  }

  async findAll() {
    return this.databaseService.user.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateAuthDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
