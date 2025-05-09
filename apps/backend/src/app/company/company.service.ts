import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly em: EntityManager) {}

  async findOne(id: string): Promise<Company | null> {
    try {
      const company = await this.em.findOneOrFail(
        Company,
        { id },
        { populate: ['users'] }
      );
      return company;
    } catch (error) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.em.find(Company, {}, { populate: ['users'] });
    } catch (error) {
      throw new Error('Failed to fetch companies');
    }
  }

  async create(name: string): Promise<Company> {
    if (!name || name.trim().length === 0) {
      throw new Error('Company name is required');
    }

    try {
      const company = this.em.create(Company, { name });
      await this.em.persistAndFlush(company);
      return company;
    } catch (error) {
      throw new Error('Failed to create company');
    }
  }
}
