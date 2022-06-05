import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { Product } from './products/model/product.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
  }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        port:3306,
        host: configService.get<string>('MY_SQL_HOST'),
        username: configService.get<string>('MY_SQL_USERNAME'),
        password: configService.get<string>('MY_SQL_PASSWORD'),
        database: configService.get<string>('MY_SQL_DATABASE'),
        autoLoadModels: false,
        synchronize: true,
        ssl: false,
        models:[Product]
      }),
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
