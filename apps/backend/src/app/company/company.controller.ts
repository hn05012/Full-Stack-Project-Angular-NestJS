import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() companyData: { name: string }): Promise<Company> {
    try {
      return await this.companyService.create(companyData.name);
    } catch (error) {
      if (error.message === 'Company name is required') {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  @Get()
  async findAll(): Promise<Company[]> {
    try {
      return await this.companyService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch companies');
    }
  }

  @Get('find')
  async findOne(@Query('company_id') company_id: string): Promise<Company> {
    try {
      return await this.companyService.findOne(company_id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Failed to fetch company');
    }
  }
}
