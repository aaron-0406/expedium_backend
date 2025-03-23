import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El email es obligatori' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  newPassword: string;

  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
  repeatPassword: string;
}
