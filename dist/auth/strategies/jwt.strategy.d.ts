import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        isEmailVerified: boolean;
        profileImage: string;
        preferences: {
            language: string;
            notificationsEnabled: boolean;
            location: string;
            theme: string;
        };
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
