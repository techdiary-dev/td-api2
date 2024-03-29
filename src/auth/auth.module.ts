import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { SessionModule } from 'src/session/session.module';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './passport-strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    AdminModule,
    UsersModule,
    SessionModule,
    RoleModule,
    PassportModule,
    ArticleModule,
  ],
  providers: [AuthResolver, AuthService, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
