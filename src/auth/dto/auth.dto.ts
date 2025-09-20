import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  acceptTerms: boolean;
}


export class ResetPasswordDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'newpassword123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class VerifyEmailCodeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  code: string;
}

export class RequestVerificationCodeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class VerifyResetCodeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  code: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'currentpassword123!' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'newpassword123!' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class UpdateProfileDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsString()
  @IsOptional()
  profileImage?: string;
}

export class UpdatePreferencesDto {
  @ApiProperty({ example: 'en' })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  notificationsEnabled?: boolean;

  @ApiProperty({ example: 'New York, NY' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 'light' })
  @IsString()
  @IsOptional()
  theme?: string;
}
