import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { encryptPassword, matchPassword } from '../libs/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.uSERS.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Correo o contraseña incorrectos');
    }
    if (!user.is_active || user.is_active !== 1) {
      throw new UnauthorizedException('Usuario inhabilitado');
    }

    const valid = await matchPassword(password, user.password!);
    if (!valid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    return user;
  }

  async changePassword(
    userId: string,
    newPassword: string,
    repeatPassword: string,
  ): Promise<void> {
    if (newPassword !== repeatPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    const password = await encryptPassword(newPassword);
    await this.prisma.uSERS.update({
      where: { id: userId },
      data: { password },
    });
  }

  // async changeCredentials(
  //   userId: string,
  //   first_name: string,
  //   last_name?: string,
  //   phone?: string,
  // ): Promise<any> {
  //   const user = await this.prisma.uSERS.findUnique({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('Usuario no encontrado');
  //   }

  //   const oldUser = { ...user };

  //   await this.prisma.uSERS.update({
  //     where: { id: userId },
  //     data: { first_name, last_name, phone },
  //   });

  //   return oldUser;
  // }

  // Generación del token JWT
  generateToken(user: any): string {
    const { password, ...payload } = user as UserType;
    void password;
    return this.jwtService.sign(payload);
  }
}
