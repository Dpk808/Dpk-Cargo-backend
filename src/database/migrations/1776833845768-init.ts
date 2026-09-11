import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776833845768 implements MigrationInterface {
    name = 'Init1776833845768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mawb" DROP COLUMN "shipper_id"`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD "shipper_id" integer`);
        await queryRunner.query(`ALTER TABLE "mawb" DROP COLUMN "consignee_id"`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD "consignee_id" integer`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD CONSTRAINT "FK_f7a8a4f65fbfe2694bfe1c16290" FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD CONSTRAINT "FK_6290f7f3cd6d95db6c45f3b9c01" FOREIGN KEY ("consignee_id") REFERENCES "consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mawb" DROP CONSTRAINT "FK_6290f7f3cd6d95db6c45f3b9c01"`);
        await queryRunner.query(`ALTER TABLE "mawb" DROP CONSTRAINT "FK_f7a8a4f65fbfe2694bfe1c16290"`);
        await queryRunner.query(`ALTER TABLE "mawb" DROP COLUMN "consignee_id"`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD "consignee_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mawb" DROP COLUMN "shipper_id"`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD "shipper_id" character varying NOT NULL`);
    }

}
