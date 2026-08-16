import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../common/prisma.service';

export interface JwtPayload {
  sub: string;
  type: 'CUSTOMER' | 'ADMIN';
  phone?: string;
  email?: string;
  roles?: string[];
  sessionId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'kenakata_jwt_super_secret_key_change_in_production_2026',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.type) {
      throw new UnauthorizedException('Invalid token payload structure');
    }

    if (payload.type === 'CUSTOMER') {
      const customer = await this.prisma.customer.findUnique({
        where: { id: payload.sub },
        select: { id: true, phoneE164: true, email: true, name: true, locale: true, status: true },
      });

      if (!customer || customer.status !== 'ACTIVE') {
        throw new UnauthorizedException('Customer account not found or disabled');
      }

      return {
        id: customer.id,
        sub: customer.id,
        type: 'CUSTOMER',
        phone: customer.phoneE164,
        email: customer.email,
        name: customer.name,
        locale: customer.locale,
      };
    }

    if (payload.type === 'ADMIN') {
      const admin = await this.prisma.adminUser.findUnique({
        where: { id: payload.sub },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!admin || admin.status !== 'ACTIVE') {
        throw new UnauthorizedException('Admin account not found or disabled');
      }

      const roleCodes = admin.roles.map((r) => r.role.code);

      return {
        id: admin.id,
        sub: admin.id,
        type: 'ADMIN',
        email: admin.email,
        name: admin.name,
        roles: roleCodes,
      };
    }

    throw new UnauthorizedException('Unknown user type in authentication token');
  }
}
