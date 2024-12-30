import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '.prisma/client';
import { UserDto, UserResponseDto } from './dto';

@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get me' })
  @ApiOkResponse({ description: 'User data', type: UserResponseDto })
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Edit me' })
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ description: 'User data', type: UserResponseDto })
  @Patch(':id')
  editUser(@GetUser('id') id: number, @Body() userData: User) {
    return this.userService.editUser(id, userData);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete me' })
  @Delete(':id')
  deleteUser(@GetUser('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
