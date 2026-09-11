import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShipperModule } from './shipper/shipper.module';
import { ConsigneeModule } from './consignee/consignee.module';
import { AirlinesModule } from './airlines/airlines.module';
import { MawbModule } from './mawb/mawb.module';
import { HawbModule } from './hawb/hawb.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { AgentModule } from './agent/agent.module';
import { CompanyModule } from './company/company.module';
import { TaxInvoiceModule } from './tax-invoice/tax-invoice.module';
import { DebitNoteModule } from './debit-note/debit-note.module';
import { CreditNoteModule } from './credit-note/credit-note.module';
import { BankModule } from './bank/bank.module';
import { MawbStockModule } from './mawb-stock/mawb-stock.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    type: 'postgres',

    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),

    ssl: {
      rejectUnauthorized: false,
    },

    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    synchronize: false,
  }),
}),
    UsersModule,
    AuthModule,
    ShipperModule,
    ConsigneeModule,
    AirlinesModule,
    MawbModule,
    HawbModule,
    CurrenciesModule,
    AgentModule,
    TaxInvoiceModule,
    CompanyModule,
    DebitNoteModule,
    CreditNoteModule,
    BankModule,
    MawbStockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
