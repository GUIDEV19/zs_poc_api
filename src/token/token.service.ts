import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(appName: string) {
    const appId = uuidv4();
    
    const payload = {
      appId,
      appName,
      createdAt: new Date().toISOString(),
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      appId,
      appName,
      createdAt: payload.createdAt,
      expiresIn: '1h',
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return {
        valid: true,
        payload,
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}
