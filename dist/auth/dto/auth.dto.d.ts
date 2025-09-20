export declare class LoginDto {
    email: string;
    password: string;
}
export declare class SignupDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptTerms: boolean;
}
export declare class ResetPasswordDto {
    code: string;
    password: string;
}
export declare class VerifyEmailCodeDto {
    email: string;
    code: string;
}
export declare class RequestVerificationCodeDto {
    email: string;
}
export declare class VerifyResetCodeDto {
    email: string;
    code: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
}
export declare class UpdatePreferencesDto {
    language?: string;
    notificationsEnabled?: boolean;
    location?: string;
    theme?: string;
}
