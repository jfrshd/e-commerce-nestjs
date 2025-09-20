import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtIncludeDeletedStrategy extends PassportStrategy(Strategy, 'jwt-include-deleted') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('🔍 JwtIncludeDeletedStrategy.validate: Validating JWT token (including deleted users)');
    console.log('🔍 JwtIncludeDeletedStrategy.validate: Full payload:', JSON.stringify(payload, null, 2));
    console.log('🔍 JwtIncludeDeletedStrategy.validate: User ID from payload:', payload.sub);
    console.log('🔍 JwtIncludeDeletedStrategy.validate: Email from payload:', payload.email);
    console.log('🔍 JwtIncludeDeletedStrategy.validate: Payload type:', typeof payload);
    console.log('🔍 JwtIncludeDeletedStrategy.validate: Payload keys:', Object.keys(payload));
    
    const user = await this.authService.getUserById(payload.sub);
    if (!user) {
      console.log('❌ JwtIncludeDeletedStrategy.validate: User not found');
      throw new UnauthorizedException();
    }
    console.log('✅ JwtIncludeDeletedStrategy.validate: User authenticated successfully (including deleted users)');
    console.log('🔍 JwtIncludeDeletedStrategy.validate: User isDeleted status:', user.isDeleted);
    return user;
  }
}
