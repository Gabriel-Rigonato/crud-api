import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreatePhysicalPersonDto } from './create-physical-person.dto';

export class CreateUserDto extends CreatePhysicalPersonDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}