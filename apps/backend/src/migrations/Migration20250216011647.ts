import { Migration } from '@mikro-orm/migrations';

export class Migration20250216011647 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "company" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "user_related_coworkers" ("user_1_id" varchar(255) not null, "user_2_id" varchar(255) not null, constraint "user_related_coworkers_pkey" primary key ("user_1_id", "user_2_id"));`);

    this.addSql(`alter table "user_related_coworkers" add constraint "user_related_coworkers_user_1_id_foreign" foreign key ("user_1_id") references "user" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "user_related_coworkers" add constraint "user_related_coworkers_user_2_id_foreign" foreign key ("user_2_id") references "user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user" add column "email" varchar(255) not null, add column "address" varchar(255) null, add column "company_id" int null;`);
    this.addSql(`alter table "user" add constraint "user_company_id_foreign" foreign key ("company_id") references "company" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_company_id_foreign";`);

    this.addSql(`drop table if exists "company" cascade;`);

    this.addSql(`drop table if exists "user_related_coworkers" cascade;`);

    this.addSql(`alter table "user" drop column "email", drop column "address", drop column "company_id";`);
  }

}
