import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToBrand1734432000000 implements MigrationInterface {
  name = 'AddStatusToBrand1734432000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "brand_status_enum" AS ENUM ('APPROVED', 'DISAPPROVED')
    `);

    await queryRunner.query(`
      ALTER TABLE "brand"
      ADD "status" "brand_status_enum" NOT NULL DEFAULT 'DISAPPROVED'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "brand" DROP COLUMN "status"
    `);

    await queryRunner.query(`
      DROP TYPE "brand_status_enum"
    `);
  }
}
