"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, emailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(loginDto) {
        console.log('🔍 AuthService.login: Starting login process');
        console.log('🔍 AuthService.login: Email:', loginDto.email);
        console.log('🔍 AuthService.login: Password length:', loginDto.password?.length);
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });
        console.log('🔍 AuthService.login: User found:', !!user);
        const allUsersWithEmail = await this.userRepository.find({
            where: { email: loginDto.email },
        });
        console.log('🔍 AuthService.login: Total users with this email:', allUsersWithEmail.length);
        if (allUsersWithEmail.length > 1) {
            console.log('⚠️ AuthService.login: WARNING - Multiple users found with same email!');
            allUsersWithEmail.forEach((u, index) => {
                console.log(`🔍 AuthService.login: User ${index + 1}: ID=${u.id}, isDeleted=${u.isDeleted}, deletedAt=${u.deletedAt}`);
            });
        }
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            console.log('❌ AuthService.login: Invalid credentials');
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('🔍 AuthService.login: Checking soft delete status...');
        console.log('🔍 AuthService.login: User ID:', user.id);
        console.log('🔍 AuthService.login: User email:', user.email);
        console.log('🔍 AuthService.login: isDeleted:', user.isDeleted);
        console.log('🔍 AuthService.login: deletedAt:', user.deletedAt);
        if (user.isDeleted) {
            console.log('❌ AuthService.login: Account is soft deleted - BLOCKING LOGIN');
            console.log('❌ AuthService.login: Account was deleted at:', user.deletedAt);
            throw new common_1.UnauthorizedException('Account has been deleted');
        }
        console.log('✅ AuthService.login: Account is not deleted - allowing login');
        console.log('🔍 AuthService.login: Email verified:', user.isEmailVerified);
        if (!user.isEmailVerified) {
            console.log('❌ AuthService.login: Email not verified');
            throw new common_1.ForbiddenException('Please verify your email before logging in');
        }
        const payload = { sub: user.id, email: user.email };
        console.log('🔍 AuthService.login: Creating JWT payload:');
        console.log('🔍 AuthService.login: Payload sub (user.id):', user.id);
        console.log('🔍 AuthService.login: Payload email:', user.email);
        const accessToken = this.jwtService.sign(payload);
        console.log('✅ AuthService.login: Login successful, token generated');
        console.log('🔍 AuthService.login: Generated token (first 50 chars):', accessToken.substring(0, 50) + '...');
        return {
            access_token: accessToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                isEmailVerified: user.isEmailVerified,
                profileImage: user.profileImage,
                preferences: {
                    language: user.language,
                    notificationsEnabled: user.notificationsEnabled,
                    location: user.location,
                    theme: user.theme,
                },
            },
        };
    }
    async signup(signupDto) {
        console.log('🔍 AuthService.signup: Starting signup process');
        console.log('🔍 AuthService.signup: Email:', signupDto.email);
        console.log('🔍 AuthService.signup: First name:', signupDto.firstName);
        console.log('🔍 AuthService.signup: Last name:', signupDto.lastName);
        console.log('🔍 AuthService.signup: Phone:', signupDto.phone);
        console.log('🔍 AuthService.signup: Accept terms:', signupDto.acceptTerms);
        const existingUser = await this.userRepository.findOne({
            where: { email: signupDto.email },
        });
        console.log('🔍 AuthService.signup: Existing user found:', !!existingUser);
        if (existingUser) {
            console.log('❌ AuthService.signup: User already exists');
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(signupDto.password, 12);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('🔍 AuthService.signup: Generated verification code:', verificationCode);
        const user = this.userRepository.create({
            email: signupDto.email,
            password: hashedPassword,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
            phone: signupDto.phone,
            emailVerificationCode: verificationCode,
            emailVerificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
        });
        await this.userRepository.save(user);
        await this.emailService.sendVerificationEmail(user.email, verificationCode);
        return {
            message: 'User registered successfully. Please check your email for verification code.',
            userId: user.id,
            email: user.email,
        };
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.userRepository.findOne({
            where: {
                passwordResetCode: resetPasswordDto.code,
            },
        });
        if (!user ||
            !user.passwordResetCode ||
            user.passwordResetCode !== resetPasswordDto.code ||
            !user.passwordResetCodeExpires ||
            user.passwordResetCodeExpires < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired reset code');
        }
        const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 12);
        user.password = hashedPassword;
        user.passwordResetCode = null;
        user.passwordResetCodeExpires = null;
        await this.userRepository.save(user);
        return { message: 'Password has been reset successfully', success: true };
    }
    async changePassword(userId, changePasswordDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
                isDeleted: false
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isCurrentPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
        user.password = hashedNewPassword;
        await this.userRepository.save(user);
        return { message: 'Password changed successfully', success: true };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
                isDeleted: false
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isEmailVerified: user.isEmailVerified,
            profileImage: user.profileImage,
            preferences: {
                language: user.language,
                notificationsEnabled: user.notificationsEnabled,
                location: user.location,
                theme: user.theme,
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async getUserById(userId) {
        console.log('🔍 AuthService.getUserById: Looking up user by ID:', userId);
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        console.log('🔍 AuthService.getUserById: User found:', !!user);
        if (user) {
            console.log('🔍 AuthService.getUserById: User email:', user.email);
            console.log('🔍 AuthService.getUserById: User isDeleted:', user.isDeleted);
            console.log('🔍 AuthService.getUserById: User deletedAt:', user.deletedAt);
        }
        if (!user) {
            console.log('❌ AuthService.getUserById: User not found in database');
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
                isDeleted: false
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        Object.assign(user, updateProfileDto);
        await this.userRepository.save(user);
        return this.getProfile(userId);
    }
    async updatePreferences(userId, updatePreferencesDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
                isDeleted: false
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (updatePreferencesDto.language !== undefined)
            user.language = updatePreferencesDto.language;
        if (updatePreferencesDto.notificationsEnabled !== undefined)
            user.notificationsEnabled = updatePreferencesDto.notificationsEnabled;
        if (updatePreferencesDto.location !== undefined)
            user.location = updatePreferencesDto.location;
        if (updatePreferencesDto.theme !== undefined)
            user.theme = updatePreferencesDto.theme;
        await this.userRepository.save(user);
        return this.getProfile(userId);
    }
    async requestEmailVerificationCode(email) {
        console.log('🔍 AuthService.requestEmailVerificationCode: Starting process');
        console.log('🔍 AuthService.requestEmailVerificationCode: Email:', email);
        console.log('🔍 AuthService.requestEmailVerificationCode: Email type:', typeof email);
        console.log('🔍 AuthService.requestEmailVerificationCode: Email length:', email?.length);
        const user = await this.userRepository.findOne({
            where: {
                email,
                isDeleted: false
            }
        });
        console.log('🔍 AuthService.requestEmailVerificationCode: User found:', !!user);
        if (!user) {
            console.log('❌ AuthService.requestEmailVerificationCode: User not found');
            throw new common_1.BadRequestException('User with this email does not exist');
        }
        console.log('🔍 AuthService.requestEmailVerificationCode: User email verified:', user.isEmailVerified);
        if (user.isEmailVerified) {
            console.log('❌ AuthService.requestEmailVerificationCode: Email already verified');
            throw new common_1.BadRequestException('Email is already verified');
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresInSeconds = 600;
        console.log('🔍 AuthService.requestEmailVerificationCode: Generated code:', verificationCode);
        console.log('🔍 AuthService.requestEmailVerificationCode: Code expires in:', expiresInSeconds, 'seconds');
        user.emailVerificationCode = verificationCode;
        user.emailVerificationCodeExpires = new Date(Date.now() + expiresInSeconds * 1000);
        console.log('🔍 AuthService.requestEmailVerificationCode: Saving user with verification code');
        await this.userRepository.save(user);
        console.log('🔍 AuthService.requestEmailVerificationCode: Sending verification email');
        await this.emailService.sendVerificationEmail(email, verificationCode);
        console.log('✅ AuthService.requestEmailVerificationCode: Verification email sent successfully');
        return {
            message: 'Email verification code sent to your email',
            codeSent: true,
            email: user.email,
            expiresInSeconds,
        };
    }
    async verifyEmailCode(email, code) {
        console.log('🔍 AuthService.verifyEmailCode: Starting verification process');
        console.log('🔍 AuthService.verifyEmailCode: Email:', email);
        console.log('🔍 AuthService.verifyEmailCode: Code:', code);
        console.log('🔍 AuthService.verifyEmailCode: Email type:', typeof email);
        console.log('🔍 AuthService.verifyEmailCode: Code type:', typeof code);
        console.log('🔍 AuthService.verifyEmailCode: Email length:', email?.length);
        console.log('🔍 AuthService.verifyEmailCode: Code length:', code?.length);
        const user = await this.userRepository.findOne({
            where: {
                email,
                isDeleted: false
            }
        });
        console.log('🔍 AuthService.verifyEmailCode: User found:', !!user);
        if (!user) {
            console.log('❌ AuthService.verifyEmailCode: User not found');
            throw new common_1.BadRequestException('User with this email does not exist');
        }
        console.log('🔍 AuthService.verifyEmailCode: User verification code:', user.emailVerificationCode);
        console.log('🔍 AuthService.verifyEmailCode: User verification expires:', user.emailVerificationCodeExpires);
        console.log('🔍 AuthService.verifyEmailCode: Current time:', new Date());
        console.log('🔍 AuthService.verifyEmailCode: Code matches:', user.emailVerificationCode === code);
        console.log('🔍 AuthService.verifyEmailCode: Code not expired:', user.emailVerificationCodeExpires && user.emailVerificationCodeExpires > new Date());
        if (!user.emailVerificationCode ||
            user.emailVerificationCode !== code ||
            !user.emailVerificationCodeExpires ||
            user.emailVerificationCodeExpires < new Date()) {
            console.log('❌ AuthService.verifyEmailCode: Invalid or expired verification code');
            throw new common_1.BadRequestException('Invalid or expired verification code');
        }
        console.log('✅ AuthService.verifyEmailCode: Code verification successful, updating user');
        user.isEmailVerified = true;
        user.emailVerificationCode = null;
        user.emailVerificationCodeExpires = null;
        console.log('🔍 AuthService.verifyEmailCode: Saving user with verified email');
        await this.userRepository.save(user);
        console.log('✅ AuthService.verifyEmailCode: Email verification completed successfully');
        return { message: 'Email verified successfully', verified: true };
    }
    async requestPasswordResetCode(email) {
        const user = await this.userRepository.findOne({
            where: {
                email,
                isDeleted: false
            }
        });
        if (!user) {
            throw new common_1.BadRequestException('User with this email does not exist');
        }
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresInSeconds = 600;
        user.passwordResetCode = resetCode;
        user.passwordResetCodeExpires = new Date(Date.now() + expiresInSeconds * 1000);
        await this.userRepository.save(user);
        await this.emailService.sendPasswordResetEmail(email, resetCode);
        return {
            message: 'Password reset code sent to your email',
            codeSent: true,
            email: user.email,
            expiresInSeconds,
        };
    }
    async verifyPasswordResetCode(email, code) {
        const user = await this.userRepository.findOne({
            where: {
                email,
                isDeleted: false
            }
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset code');
        }
        if (!user.passwordResetCode ||
            user.passwordResetCode !== code ||
            !user.passwordResetCodeExpires ||
            user.passwordResetCodeExpires < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired reset code');
        }
        return { message: 'Password reset code verified', verified: true };
    }
    async deleteAccount(userId) {
        console.log('🔍 AuthService.deleteAccount: Starting account soft deletion process');
        console.log('🔍 AuthService.deleteAccount: User ID:', userId);
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            console.log('❌ AuthService.deleteAccount: User not found');
            throw new common_1.UnauthorizedException('User not found');
        }
        console.log('🔍 AuthService.deleteAccount: User found:', user.email);
        console.log('🔍 AuthService.deleteAccount: Current isDeleted status:', user.isDeleted);
        console.log('🔍 AuthService.deleteAccount: Current deletedAt:', user.deletedAt);
        if (user.isDeleted) {
            console.log('❌ AuthService.deleteAccount: User account is already deleted');
            console.log('❌ AuthService.deleteAccount: Account was previously deleted at:', user.deletedAt);
            throw new common_1.BadRequestException('Account has already been deleted');
        }
        console.log('🔍 AuthService.deleteAccount: Account is not deleted - proceeding with soft deletion');
        console.log('🔍 AuthService.deleteAccount: Setting isDeleted = true and deletedAt = now');
        const deletionTime = new Date();
        user.isDeleted = true;
        user.deletedAt = deletionTime;
        console.log('🔍 AuthService.deleteAccount: Saving user with soft delete flags...');
        await this.userRepository.save(user);
        console.log('✅ AuthService.deleteAccount: Account soft deleted successfully');
        console.log('✅ AuthService.deleteAccount: isDeleted set to:', user.isDeleted);
        console.log('✅ AuthService.deleteAccount: deletedAt set to:', user.deletedAt);
        console.log('✅ AuthService.deleteAccount: User will no longer be able to login');
        return {
            message: 'Account has been deleted successfully',
            success: true,
            deletedAt: user.deletedAt.toISOString()
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map