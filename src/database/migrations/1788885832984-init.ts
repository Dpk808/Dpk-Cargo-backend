import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1788885832984 implements MigrationInterface {
    name = 'Init1788885832984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."mawb_stock_status_enum" RENAME TO "mawb_stock_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."mawb_stock_status_enum" AS ENUM('available', 'held', 'used', 'in_use')`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ALTER COLUMN "status" TYPE "public"."mawb_stock_status_enum" USING "status"::"text"::"public"."mawb_stock_status_enum"`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ALTER COLUMN "status" SET DEFAULT 'available'`);
        await queryRunner.query(`DROP TYPE "public"."mawb_stock_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."mawb_stock_status_enum_old" AS ENUM('available', 'held', 'used')`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ALTER COLUMN "status" TYPE "public"."mawb_stock_status_enum_old" USING "status"::"text"::"public"."mawb_stock_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ALTER COLUMN "status" SET DEFAULT 'available'`);
        await queryRunner.query(`DROP TYPE "public"."mawb_stock_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."mawb_stock_status_enum_old" RENAME TO "mawb_stock_status_enum"`);
    }

}
