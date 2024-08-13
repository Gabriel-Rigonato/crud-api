import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { ApplicationException } from '../exceptions/application.exception';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new ApplicationException(
            HttpStatus.FORBIDDEN,
            '001',
            'Unauthorized.',
            'Não autorizado. É necessário um token para esta requisição.'
        );
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET
          }
        );
        
        request['user'] = payload;
      } catch {
        throw new ApplicationException(
            HttpStatus.UNAUTHORIZED,
            '001',
            'Unauthorized.',
            'Não autorizado. Token inválido ou expirado.'
        );
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }