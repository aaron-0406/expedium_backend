// src/auth/auth.controller.ts
import {
  Req,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { ChangePasswordDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserType } from 'src/types/user.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para iniciar sesión
  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  signIn(@Req() req: Request) {
    const token = this.authService.generateToken(req.user);
    return {
      success: 'Sesión iniciada',
      user: req.user as UserType,
      token,
    };
  }

  // Endpoint para cambiar contraseña
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const user = req.user as UserType;
    console.log('🚀 ~ AuthController ~ userId:', user);

    void this.authService.changePassword(
      user.id,
      changePasswordDto.newPassword,
      changePasswordDto.repeatPassword,
    );
    return { success: 'Contraseña cambiada correctamente' };
  }

  //   // Endpoint para actualizar credenciales
  //   @UseGuards(JwtAuthGuard)
  //   @Post('change-credentials')
  //   changeCredentials(
  //     @Req() req: Request,
  //     @Body() changeCredentialsDto: ChangeCredentialsDto,
  //   ) {
  //     const userId = req.user['id'];
  //     const oldUser = await this.authService.changeCredentials(
  //       userId,
  //       changeCredentialsDto.first_name,
  //       changeCredentialsDto.last_name,
  //       changeCredentialsDto.phone,
  //     );
  //     return { success: 'Credenciales actualizadas', oldUser };
  //   }
}
