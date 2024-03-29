import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';

/**
 * -----------------------
 *  Modules
 * -----------------------
 */
import { AdminModule } from './admin/admin.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { InteractionModule } from './interaction/interaction.module';
import { CommentModule } from './comment/comment.module';
import { PagesModule } from './pages/pages.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'techdiary.gql',
      path: '/',
      context: ({ req, res }) => ({ req, res }),
      engine: {
        reportSchema: true,
      },
      cors: false,
      playground: config.get<boolean>('GQL_PLAYGROUND'),
      introspection: config.get<boolean>('GQL_PLAYGROUND'),
    }),
    //-------------
    ConfigModule.forRoot({ isGlobal: true }),
    {
      ...JwtModule.register({ secret: config.get('JWT_SECRET') }),
      global: true,
    },
    TypegooseModule.forRoot(config.get('DATABASE_URL'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    AdminModule,
    SessionModule,
    AuthModule,
    RoleModule,
    UsersModule,
    ArticleModule,
    InteractionModule,
    CommentModule,
    PagesModule,
  ],
})
export class AppModule {}
