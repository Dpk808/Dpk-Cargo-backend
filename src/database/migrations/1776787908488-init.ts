import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776787908488 implements MigrationInterface {
    name = 'Init1776787908488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounting" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "is_prepaid" boolean NOT NULL DEFAULT false, "is_collect" boolean NOT NULL DEFAULT false, "reference_number" character varying NOT NULL, "currency" character varying NOT NULL, "chgs_code" character varying NOT NULL, "wt_val_ppd" boolean NOT NULL DEFAULT false, "wt_val_coll" boolean NOT NULL DEFAULT false, "other_ppd" boolean NOT NULL DEFAULT false, "other_coll" boolean NOT NULL DEFAULT false, "declared_value_carriage" numeric(10,2) NOT NULL, "declared_value_customs" numeric(10,2) NOT NULL, "insurance_amt" numeric(10,2) NOT NULL, CONSTRAINT "PK_6a6f4091126bfca1743ad2eb14f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dimension" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "length" double precision NOT NULL, "width" double precision NOT NULL, "height" double precision NOT NULL, "mawbId" integer, CONSTRAINT "PK_653e621826a32965348bd4faff4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "agent_name" character varying NOT NULL, "agent_city" character varying NOT NULL, "IATA_code" character varying NOT NULL, "account_no" character varying NOT NULL, "departure" character varying NOT NULL, "destination" character varying NOT NULL, CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mawb" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "airline_prefix" character varying NOT NULL, "serial_no" character varying NOT NULL, "check_digit" character varying NOT NULL, "shipper_id" character varying NOT NULL, "consignee_id" character varying NOT NULL, "information" character varying, "note" character varying, "no_of_pieces" integer NOT NULL, "gross_weight" numeric(10,2) NOT NULL, "unit" character varying NOT NULL, "rate_class" character varying NOT NULL, "commodity_item_no" character varying NOT NULL, "chargable_weight" numeric(10,2) NOT NULL, "rate" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "agentId" integer, "accountingId" integer, CONSTRAINT "REL_2cf5d8ad5376e3926bfd7d1633" UNIQUE ("agentId"), CONSTRAINT "REL_3a25b89cbb281167c331d69d20" UNIQUE ("accountingId"), CONSTRAINT "PK_c35cc44afb512db73ceedfd3fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "airlines" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airlines" ADD CONSTRAINT "PK_74f50545f40719d6a763da9da47" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "airlines" ALTER COLUMN "iata_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dimension" ADD CONSTRAINT "FK_88f20f2f77321d5538a196da671" FOREIGN KEY ("mawbId") REFERENCES "mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD CONSTRAINT "FK_2cf5d8ad5376e3926bfd7d16338" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mawb" ADD CONSTRAINT "FK_3a25b89cbb281167c331d69d204" FOREIGN KEY ("accountingId") REFERENCES "accounting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mawb" DROP CONSTRAINT "FK_3a25b89cbb281167c331d69d204"`);
        await queryRunner.query(`ALTER TABLE "mawb" DROP CONSTRAINT "FK_2cf5d8ad5376e3926bfd7d16338"`);
        await queryRunner.query(`ALTER TABLE "dimension" DROP CONSTRAINT "FK_88f20f2f77321d5538a196da671"`);
        await queryRunner.query(`ALTER TABLE "airlines" ALTER COLUMN "iata_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airlines" DROP CONSTRAINT "PK_74f50545f40719d6a763da9da47"`);
        await queryRunner.query(`ALTER TABLE "airlines" DROP COLUMN "id"`);
        await queryRunner.query(`DROP TABLE "mawb"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`DROP TABLE "dimension"`);
        await queryRunner.query(`DROP TABLE "accounting"`);
    }

}
