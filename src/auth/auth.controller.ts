// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { ChangePasswordDto } from './dtos/change-password.dto';
// import { ChangeCredentialsDto } from './dtos/change-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/auth.dto';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para iniciar sesión
  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  signIn(@Body(new ValidationPipe()) loginDto: LoginDto) {
    console.log('controller 1');
    const token = this.authService.generateToken(loginDto);
    console.log('controller 2');
    return {
      success: 'Sesión iniciada',
      user: loginDto,
      token,
    };
  }

  //   // Endpoint para cambiar contraseña
  //   @UseGuards(JwtAuthGuard)
  //   @Post('change-password')
  //   async changePassword(
  //     @Req() req: Request,
  //     @Body() changePasswordDto: ChangePasswordDto,
  //   ) {
  //     const userId = req.user['id'];
  //     await this.authService.changePassword(
  //       userId,
  //       changePasswordDto.newPassword,
  //       changePasswordDto.repeatPassword,
  //     );
  //     return { success: 'Contraseña cambiada correctamente' };
  //   }

  //   // Endpoint para actualizar credenciales
  //   @UseGuards(JwtAuthGuard)
  //   @Post('change-credentials')
  //   async changeCredentials(
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
