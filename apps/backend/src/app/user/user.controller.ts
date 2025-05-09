import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get('find')
  async findOne(@Query('user_id') user_id: string): Promise<User> {
    try {
      if (!user_id) {
        throw new NotFoundException('User ID is required');
      }
      return await this.userService.findOne(user_id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(userData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Put()
  async update(
    @Query('user_id') user_id: string,
    @Body() userData: UpdateUserDto
  ): Promise<User> {
    try {
      return await this.userService.update(user_id, userData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Put('assign-company-to')
  async assignCompany(
    @Query('user_id') user_id: string,
    @Body() body: { companyId: string }
  ): Promise<User> {
    try {
      return await this.userService.assignCompany(user_id, body.companyId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Failed to assign company to user'
      );
    }
  }
}
