import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePhysicalPersonDto {

  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  @IsOptional()
  phone: string;
}