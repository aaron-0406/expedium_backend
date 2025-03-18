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
    });
  }
  async validate(
    email: string,
    password: string,
  ): Promise<Omit<UserType, 'password'>> {
    console.log('Ejecutando estrategia local...');
    const user = (await this.authService.login(email, password)) as UserType;
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Excluimos la propiedad "password" del objeto de usuario
    const { password: _pwd, ...result } = user;
    void _pwd;
    return result as Omit<UserType, 'password'>;
  }
}
