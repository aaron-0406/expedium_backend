import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserType } from 'src/types/user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserType, 'password'>> {
    // Utilizamos "any" ya que el método login retorna any
    const user = (await this.authService.login(email, password)) as UserType;
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password: _pwd, ...result } = user;
    void _pwd;
    return result as Omit<UserType, 'password'>;
  }
}
