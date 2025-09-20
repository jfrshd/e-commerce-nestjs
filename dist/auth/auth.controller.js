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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const auth_dto_2 = require("./dto/auth.dto");
const auth_dto_3 = require("./dto/auth.dto");
const auth_dto_4 = require("./dto/auth.dto");
const auth_dto_5 = require("./dto/auth.dto");
const auth_dto_6 = require("./dto/auth.dto");
const auth_dto_7 = require("./dto/auth.dto");
const auth_dto_8 = require("./dto/auth.dto");
const auth_dto_9 = require("./dto/auth.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_include_deleted_guard_1 = require("./guards/jwt-include-deleted.guard");
const get_user_decorator_1 = require("./decorators/get-user.decorator");
const user_entity_1 = require("./entities/user.entity");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        console.log('🔍 AuthController.login: Received login request');
        console.log('🔍 AuthController.login: Email:', loginDto.email);
        console.log('🔍 AuthController.login: Password length:', loginDto.password?.length);
        console.log('🔍 AuthController.login: Calling authService.login...');
        const result = await this.authService.login(loginDto);
        console.log('✅ AuthController.login: Login successful, returning result');
        return result;
    }
    async signup(signupDto) {
        console.log('🔍 AuthController.signup: Received request');
        console.log('🔍 AuthController.signup: Email:', signupDto.email);
        console.log('🔍 AuthController.signup: First name:', signupDto.firstName);
        console.log('🔍 AuthController.signup: Last name:', signupDto.lastName);
        console.log('🔍 AuthController.signup: Phone:', signupDto.phone);
        console.log('🔍 AuthController.signup: Accept terms:', signupDto.acceptTerms);
        return this.authService.signup(signupDto);
    }
    async resetPassword(resetPasswordDto) {
        console.log('🔍 AuthController.resetPassword: Received request');
        console.log('🔍 AuthController.resetPassword: Code:', resetPasswordDto.code);
        console.log('🔍 AuthController.resetPassword: Password length:', resetPasswordDto.password?.length);
        return this.authService.resetPassword(resetPasswordDto);
    }
    async requestResetCode(dto) {
        console.log('🔍 AuthController.requestResetCode: Received request');
        console.log('🔍 AuthController.requestResetCode: Email:', dto.email);
        console.log('🔍 AuthController.requestResetCode: Email type:', typeof dto.email);
        console.log('🔍 AuthController.requestResetCode: Email length:', dto.email?.length);
        return this.authService.requestPasswordResetCode(dto.email);
    }
    async verifyResetCode(dto) {
        console.log('🔍 AuthController.verifyResetCode: Received request');
        console.log('🔍 AuthController.verifyResetCode: Email:', dto.email);
        console.log('🔍 AuthController.verifyResetCode: Code:', dto.code);
        console.log('🔍 AuthController.verifyResetCode: Email type:', typeof dto.email);
        console.log('🔍 AuthController.verifyResetCode: Code type:', typeof dto.code);
        return this.authService.verifyPasswordResetCode(dto.email, dto.code);
    }
    async requestEmailCode(dto) {
        console.log('🔍 AuthController.requestEmailCode: Received request');
        console.log('🔍 AuthController.requestEmailCode: Email:', dto.email);
        console.log('🔍 AuthController.requestEmailCode: Email type:', typeof dto.email);
        console.log('🔍 AuthController.requestEmailCode: Email length:', dto.email?.length);
        return this.authService.requestEmailVerificationCode(dto.email);
    }
    async verifyEmailCode(dto) {
        console.log('🔍 AuthController.verifyEmailCode: Received request');
        console.log('🔍 AuthController.verifyEmailCode: Body:', dto);
        console.log('🔍 AuthController.verifyEmailCode: Email:', dto.email);
        console.log('🔍 AuthController.verifyEmailCode: Code:', dto.code);
        console.log('🔍 AuthController.verifyEmailCode: Email type:', typeof dto.email);
        console.log('🔍 AuthController.verifyEmailCode: Code type:', typeof dto.code);
        console.log('🔍 AuthController.verifyEmailCode: Email length:', dto.email?.length);
        console.log('🔍 AuthController.verifyEmailCode: Code length:', dto.code?.length);
        return this.authService.verifyEmailCode(dto.email, dto.code);
    }
    async getProfile(user) {
        return this.authService.getProfile(user.id);
    }
    async updateProfile(user, updateProfileDto) {
        return this.authService.updateProfile(user.id, updateProfileDto);
    }
    async updatePreferences(user, updatePreferencesDto) {
        return this.authService.updatePreferences(user.id, updatePreferencesDto);
    }
    async changePassword(user, changePasswordDto) {
        return this.authService.changePassword(user.id, changePasswordDto);
    }
    async deleteAccount(user) {
        console.log('🔍 AuthController.deleteAccount: Received delete account request');
        console.log('🔍 AuthController.deleteAccount: User ID:', user.id);
        console.log('🔍 AuthController.deleteAccount: User email:', user.email);
        console.log('🔍 AuthController.deleteAccount: Current isDeleted status:', user.isDeleted);
        console.log('🔍 AuthController.deleteAccount: Current deletedAt:', user.deletedAt);
        console.log('🔍 AuthController.deleteAccount: Calling authService.deleteAccount...');
        const result = await this.authService.deleteAccount(user.id);
        console.log('✅ AuthController.deleteAccount: Account deletion successful, returning result');
        return result;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'User login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'User registration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password with code' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired code' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_3.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('request-reset-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request 6-digit password reset code' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_5.RequestVerificationCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestResetCode", null);
__decorate([
    (0, common_1.Post)('verify-reset-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify 6-digit password reset code' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_6.VerifyResetCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetCode", null);
__decorate([
    (0, common_1.Post)('request-email-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request 6-digit email verification code' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_5.RequestVerificationCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestEmailCode", null);
__decorate([
    (0, common_1.Post)('verify-email-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify 6-digit email verification code' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_4.VerifyEmailCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmailCode", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, auth_dto_8.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('preferences'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update user preferences' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Preferences updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, auth_dto_9.UpdatePreferencesDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePreferences", null);
__decorate([
    (0, common_1.Put)('change-password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Change user password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password changed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid current password' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, auth_dto_7.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Delete)('account'),
    (0, common_1.UseGuards)(jwt_include_deleted_guard_1.JwtIncludeDeletedGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user account' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Account deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAccount", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map