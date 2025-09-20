import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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
    console.log('🔍 JwtStrategy.validate: Validating JWT token');
    console.log('🔍 JwtStrategy.validate: User ID from payload:', payload.sub);
    console.log('🔍 JwtStrategy.validate: Email from payload:', payload.email);
    const user = await this.authService.getProfile(payload.sub);
    if (!user) {
      console.log('❌ JwtStrategy.validate: User not found or soft deleted');
      throw new UnauthorizedException();
    }
    console.log('✅ JwtStrategy.validate: User authenticated successfully');
    return user;
  }
}
