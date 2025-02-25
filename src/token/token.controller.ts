import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('generate')
  async generateToken(@Body('appName') appName: string) {
    if (!appName) {
      throw new UnauthorizedException('Application name is required');
    }
    return this.tokenService.generateToken(appName);
  }

  @Get('validate')
  async validateToken(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException('Token is required');
    }

    const token = authorization.replace('Bearer ', '');
    return this.tokenService.validateToken(token);
  }
}
