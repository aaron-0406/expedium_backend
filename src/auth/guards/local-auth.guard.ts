import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from '../dto/auth.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const loginDto = plainToInstance(LoginDto, request.body);
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
