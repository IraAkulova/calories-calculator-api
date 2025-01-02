import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({
    description: 'User logged in',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    description: 'User created',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirects to Google's login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.authService.validateUser(req.user);
    const token = await this.authService.googleLogin(user);
    return { access_token: token, message: 'Google login successful' };
  }
}
