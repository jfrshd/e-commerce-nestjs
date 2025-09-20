import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtIncludeDeletedGuard } from './guards/jwt-include-deleted.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    console.log('🔍 AuthController.login: Received login request');
    console.log('🔍 AuthController.login: Email:', loginDto.email);
    console.log('🔍 AuthController.login: Password length:', loginDto.password?.length);
    console.log('🔍 AuthController.login: Calling authService.login...');
    const result = await this.authService.login(loginDto);
    console.log('✅ AuthController.login: Login successful, returning result');
    return result;
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async signup(@Body() signupDto: SignupDto) {
    console.log('🔍 AuthController.signup: Received request');
    console.log('🔍 AuthController.signup: Email:', signupDto.email);
    console.log('🔍 AuthController.signup: First name:', signupDto.firstName);
    console.log('🔍 AuthController.signup: Last name:', signupDto.lastName);
    console.log('🔍 AuthController.signup: Phone:', signupDto.phone);
    console.log('🔍 AuthController.signup: Accept terms:', signupDto.acceptTerms);
    return this.authService.signup(signupDto);
  }


  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with code' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired code' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    console.log('🔍 AuthController.resetPassword: Received request');
    console.log('🔍 AuthController.resetPassword: Code:', resetPasswordDto.code);
    console.log('🔍 AuthController.resetPassword: Password length:', resetPasswordDto.password?.length);
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('request-reset-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request 6-digit password reset code' })
  async requestResetCode(@Body() dto: RequestVerificationCodeDto) {
    console.log('🔍 AuthController.requestResetCode: Received request');
    console.log('🔍 AuthController.requestResetCode: Email:', dto.email);
    console.log('🔍 AuthController.requestResetCode: Email type:', typeof dto.email);
    console.log('🔍 AuthController.requestResetCode: Email length:', dto.email?.length);
    return this.authService.requestPasswordResetCode(dto.email);
  }

  @Post('verify-reset-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify 6-digit password reset code' })
  async verifyResetCode(@Body() dto: VerifyResetCodeDto) {
    console.log('🔍 AuthController.verifyResetCode: Received request');
    console.log('🔍 AuthController.verifyResetCode: Email:', dto.email);
    console.log('🔍 AuthController.verifyResetCode: Code:', dto.code);
    console.log('🔍 AuthController.verifyResetCode: Email type:', typeof dto.email);
    console.log('🔍 AuthController.verifyResetCode: Code type:', typeof dto.code);
    return this.authService.verifyPasswordResetCode(dto.email, dto.code);
  }

  @Post('request-email-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request 6-digit email verification code' })
  async requestEmailCode(@Body() dto: RequestVerificationCodeDto) {
    console.log('🔍 AuthController.requestEmailCode: Received request');
    console.log('🔍 AuthController.requestEmailCode: Email:', dto.email);
    console.log('🔍 AuthController.requestEmailCode: Email type:', typeof dto.email);
    console.log('🔍 AuthController.requestEmailCode: Email length:', dto.email?.length);
    return this.authService.requestEmailVerificationCode(dto.email);
  }

  @Post('verify-email-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify 6-digit email verification code' })
  async verifyEmailCode(@Body() dto: VerifyEmailCodeDto) {
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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@GetUser() user: User) {
    return this.authService.getProfile(user.id);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(@GetUser() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(user.id, updateProfileDto);
  }

  @Put('preferences')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatePreferences(@GetUser() user: User, @Body() updatePreferencesDto: UpdatePreferencesDto) {
    return this.authService.updatePreferences(user.id, updatePreferencesDto);
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Invalid current password' })
  async changePassword(@GetUser() user: User, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @Delete('account')
  @UseGuards(JwtIncludeDeletedGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteAccount(@GetUser() user: User) {
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
}