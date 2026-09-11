import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1788597817175 implements MigrationInterface {
    name = 'Init1788597817175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."mawb_stock_status_enum" AS ENUM('available', 'held', 'used')`);
        await queryRunner.query(`CREATE TABLE "mawb_stock" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "airline_prefix" character varying(5) NOT NULL, "serial_no" character(7) NOT NULL, "check_digit" character(1) NOT NULL, "status" "public"."mawb_stock_status_enum" NOT NULL DEFAULT 'available', "held_at" TIMESTAMP, "used_at" TIMESTAMP, "remarks" character varying(255), "airline_id" integer NOT NULL, "held_by_agent_id" integer, CONSTRAINT "PK_74a13185f5d47c2604146db6833" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ADD CONSTRAINT "FK_ccf897456be702a57015e286aac" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" ADD CONSTRAINT "FK_6277046fbb0402c58ad986b0844" FOREIGN KEY ("held_by_agent_id") REFERENCES "common"."agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mawb_stock" DROP CONSTRAINT "FK_6277046fbb0402c58ad986b0844"`);
        await queryRunner.query(`ALTER TABLE "mawb_stock" DROP CONSTRAINT "FK_ccf897456be702a57015e286aac"`);
        await queryRunner.query(`DROP TABLE "mawb_stock"`);
        await queryRunner.query(`DROP TYPE "public"."mawb_stock_status_enum"`);
    }

}
