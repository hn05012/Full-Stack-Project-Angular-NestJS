import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { CompanyModule } from '../company/company.module';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User]), CompanyModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
