import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { LoginDto, SignupDto, ResetPasswordDto, ChangePasswordDto, UpdateProfileDto, UpdatePreferencesDto } from './dto/auth.dto';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private emailService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, emailService: EmailService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            isEmailVerified: true;
            profileImage: string;
            preferences: {
                language: string;
                notificationsEnabled: boolean;
                location: string;
                theme: string;
            };
        };
    }>;
    signup(signupDto: SignupDto): Promise<{
        message: string;
        userId: string;
        email: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        success: boolean;
    }>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
        success: boolean;
    }>;
    getProfile(userId: string): Promise<{
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
    getUserById(userId: string): Promise<User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<{
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
    updatePreferences(userId: string, updatePreferencesDto: UpdatePreferencesDto): Promise<{
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
    requestEmailVerificationCode(email: string): Promise<{
        message: string;
        codeSent: boolean;
        email: string;
        expiresInSeconds: number;
    }>;
    verifyEmailCode(email: string, code: string): Promise<{
        message: string;
        verified: boolean;
    }>;
    requestPasswordResetCode(email: string): Promise<{
        message: string;
        codeSent: boolean;
        email: string;
        expiresInSeconds: number;
    }>;
    verifyPasswordResetCode(email: string, code: string): Promise<{
        message: string;
        verified: boolean;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
        success: boolean;
        deletedAt: string;
    }>;
}
