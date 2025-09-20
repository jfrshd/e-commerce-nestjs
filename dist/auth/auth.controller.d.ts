import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { SignupDto } from './dto/auth.dto';
import { ResetPasswordDto } from './dto/auth.dto';
import { VerifyEmailCodeDto } from './dto/auth.dto';
import { RequestVerificationCodeDto } from './dto/auth.dto';
import { VerifyResetCodeDto } from './dto/auth.dto';
import { ChangePasswordDto } from './dto/auth.dto';
import { UpdateProfileDto } from './dto/auth.dto';
import { UpdatePreferencesDto } from './dto/auth.dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    requestResetCode(dto: RequestVerificationCodeDto): Promise<{
        message: string;
        codeSent: boolean;
        email: string;
        expiresInSeconds: number;
    }>;
    verifyResetCode(dto: VerifyResetCodeDto): Promise<{
        message: string;
        verified: boolean;
    }>;
    requestEmailCode(dto: RequestVerificationCodeDto): Promise<{
        message: string;
        codeSent: boolean;
        email: string;
        expiresInSeconds: number;
    }>;
    verifyEmailCode(dto: VerifyEmailCodeDto): Promise<{
        message: string;
        verified: boolean;
    }>;
    getProfile(user: User): Promise<{
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
    updateProfile(user: User, updateProfileDto: UpdateProfileDto): Promise<{
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
    updatePreferences(user: User, updatePreferencesDto: UpdatePreferencesDto): Promise<{
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
    changePassword(user: User, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
        success: boolean;
    }>;
    deleteAccount(user: User): Promise<{
        message: string;
        success: boolean;
        deletedAt: string;
    }>;
}
