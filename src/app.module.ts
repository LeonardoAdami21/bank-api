import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AccountsModule } from './accounts/accounts.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CardsModule } from './cards/cards.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        ignoreTLS: true,
        auth: {
          user: 'g8mDy@example.com',
          pass: 'password',
        },
      },
      defaults: {
        from: 'Bank App <g8mDy@example.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UsersModule,
    AuthModule,
    AddressModule,
    AccountsModule,
    TransactionsModule,
    CardsModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
