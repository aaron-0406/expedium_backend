import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserType } from 'src/types/user.type';
import { LoginDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserType, 'password'>> {
    const loginDto = plainToInstance(LoginDto, { email, password });
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      const constraints = errors[0].constraints;
      const errorMessage = constraints
        ? Object.values(constraints)[0]
        : 'Credenciales inválidas';

      throw new UnauthorizedException(errorMessage);
    }

    const user = (await this.authService.login(email, password)) as UserType;
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password: _pwd, ...result } = user;
    void _pwd;
    return result as Omit<UserType, 'password'>;
  }
}
