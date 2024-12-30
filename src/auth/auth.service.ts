import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const match = await argon.verify(user.password, dto.googleId);
    if (!match) {
      throw new ForbiddenException('Invalid credentials');
    }
    const access_token = await this.signToken(user.id, user.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return { ...result, access_token };
  }

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      const access_token = await this.signToken(user.id, user.email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result, access_token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }
  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });
  }
  async validateUser(user: any): Promise<any> {
    if (!user.email) {
      throw new ForbiddenException('Invalid credentials');
    }
    return user;
  }

  async findUser(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async googleLogin(user: any) {
    const existingUser = await this.findUser(user.email);
    let token = '';
    if (existingUser) {
      const { access_token } = await this.login(user);
      token = access_token;
    } else {
      const data = { email: user.email, password: user.googleId };
      const { access_token } = await this.signup(data);
      token = access_token;
    }
    return token;
  }
}
