import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1788795728480 implements MigrationInterface {
    name = 'Init1788795728480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mawb_stock" ADD "mawb_started_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ADD CONSTRAINT "uq_mawb_stock_serial" UNIQUE ("airline_id", "airline_prefix", "serial_no")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mawb_stock" DROP CONSTRAINT "uq_mawb_stock_serial"`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" DROP COLUMN "mawb_started_at"`);
    }

}
