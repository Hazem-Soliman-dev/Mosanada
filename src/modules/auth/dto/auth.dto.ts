import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Acme Corp', description: 'Company/tenant name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'admin@acme.com', description: 'Admin email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Password (min 6 chars)', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'admin@acme.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  access_token: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  tenantId: string;

  @ApiProperty({ example: 'ADMIN' })
  role: string;
}
