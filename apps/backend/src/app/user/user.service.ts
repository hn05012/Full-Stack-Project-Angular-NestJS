import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly companyService: CompanyService
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.em.find(
        User,
        {},
        { populate: ['company', 'relatedCoworkers'] }
      );
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.em.findOneOrFail(
        User,
        { id },
        { populate: ['company', 'relatedCoworkers'] }
      );
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async create(userData: CreateUserDto): Promise<User> {
    try {
      let company: Company | null = null;
      if (userData?.companyId) {
        company = await this.companyService.findOne(userData.companyId);
        if (!company) {
          throw new NotFoundException(
            `Company with ID ${userData.companyId} not found`
          );
        }
      }
      const { companyId: _, ...userWithoutCompanyId } = userData;
      const user = this.em.create(User, userWithoutCompanyId);
      user.company = company;
      await this.em.persistAndFlush(user);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create user');
    }
  }

  async update(id: string, userData: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      if (userData?.companyId) {
        const company = await this.companyService.findOne(userData.companyId);
        if (!company) {
          throw new NotFoundException(
            `Company with ID ${userData.companyId} not found`
          );
        }
        user.company = company;
      }

      if (userData?.relatedCoworkerIds) {
        const existingCoworkers = await this.em.find(User, {
          id: { $in: userData.relatedCoworkerIds },
        });
        user.relatedCoworkers.set(existingCoworkers);
      }

      const { companyId, relatedCoworkerIds, ...rest } = userData;
      this.em.assign(user, rest);
      await this.em.flush();
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to update user');
    }
  }

  async assignCompany(userId: string, companyId: string): Promise<User> {
    try {
      const user = await this.findOne(userId);
      const company = await this.companyService.findOne(companyId);
      if (!company) {
        throw new NotFoundException(`Company with ID ${companyId} not found`);
      }
      user.company = company;
      await this.em.flush();
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to assign company to user');
    }
  }
}
