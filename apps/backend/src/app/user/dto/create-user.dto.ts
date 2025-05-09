import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  position: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsUUID()
  companyId?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  relatedCoworkerIds?: string[];
}
