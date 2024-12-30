import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, userData: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, password, id, ...data } = userData;
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    delete user.password;
    return user;
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
    return { message: 'User deleted successfully' };
  }
}
