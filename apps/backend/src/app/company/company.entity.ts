import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  BaseEntity,
} from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { CompanyRepository } from './company.repository';
import { v4 } from 'uuid';

@Entity({ repository: () => CompanyRepository })
export class Company extends BaseEntity {
  @PrimaryKey()
  id: string = v4();

  @Property()
  name: string;

  @OneToMany(() => User, (user) => user.company, { nullable: true })
  users = new Collection<User>(this);
}
