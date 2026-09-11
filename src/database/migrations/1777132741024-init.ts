import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777132741024 implements MigrationInterface {
    name = 'Init1777132741024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hawb_agent" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "agent_name" character varying NOT NULL, "agent_city" character varying NOT NULL, "IATA_code" character varying NOT NULL, "account_no" character varying NOT NULL, "departure" character varying NOT NULL, "to" character varying NOT NULL, "by_first_carrier" character varying NOT NULL, "second_to" character varying NOT NULL, "second_by" character varying NOT NULL, "third_to" character varying NOT NULL, "third_by" character varying NOT NULL, "destination" character varying NOT NULL, CONSTRAINT "PK_3223deecab9b4b8249d0ccde205" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hawb_dimension" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "length" double precision NOT NULL, "width" double precision NOT NULL, "height" double precision NOT NULL, "hawbId" integer, CONSTRAINT "PK_86d5135fabd29b985b652e7a402" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hawb_accounting" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "is_prepaid" boolean NOT NULL DEFAULT false, "is_collect" boolean NOT NULL DEFAULT false, "chgs_code" character varying NOT NULL, "wt_val_ppd" boolean NOT NULL DEFAULT false, "wt_val_coll" boolean NOT NULL DEFAULT false, "other_ppd" boolean NOT NULL DEFAULT false, "other_coll" boolean NOT NULL DEFAULT false, "declared_value_carriage" numeric(10,2) NOT NULL, "declared_value_customs" numeric(10,2) NOT NULL, "insurance_amt" numeric(10,2) NOT NULL, CONSTRAINT "PK_5309510b3921548634f9fc80b15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hawb" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "information" character varying, "note" character varying, "no_of_pieces" integer NOT NULL, "gross_weight" numeric(10,2) NOT NULL, "unit" character varying NOT NULL, "rate_class" character varying NOT NULL, "commodity_item_no" character varying NOT NULL, "chargable_weight" numeric(10,2) NOT NULL, "rate" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "mawb_id" integer, "shipper_id" integer, "consignee_id" integer, "agentId" integer, "accountingId" integer, CONSTRAINT "REL_08274583a2e2fe0c52973d1b62" UNIQUE ("agentId"), CONSTRAINT "REL_c1e2d8ad12e580222b4ea3e8c2" UNIQUE ("accountingId"), CONSTRAINT "PK_cac9c50c5fda5e22ce3d7e77ac2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "by_first_carrier" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "second_to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "second_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "third_to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "third_by" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hawb_dimension" ADD CONSTRAINT "FK_60d8fa0deffbdcce6e26e2799a5" FOREIGN KEY ("hawbId") REFERENCES "hawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hawb" ADD CONSTRAINT "FK_61f07c672ef39ccdfeaee1d392f" FOREIGN KEY ("mawb_id") REFERENCES "mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hawb" ADD CONSTRAINT "FK_853ed7019685c18cd666e4d8917" FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hawb" ADD CONSTRAINT "FK_083a54972a5a3925f897537250b" FOREIGN KEY ("consignee_id") REFERENCES "consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hawb" ADD CONSTRAINT "FK_08274583a2e2fe0c52973d1b62c" FOREIGN KEY ("agentId") REFERENCES "hawb_agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hawb" ADD CONSTRAINT "FK_c1e2d8ad12e580222b4ea3e8c2b" FOREIGN KEY ("accountingId") REFERENCES "hawb_accounting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hawb" DROP CONSTRAINT "FK_c1e2d8ad12e580222b4ea3e8c2b"`);
        await queryRunner.query(`ALTER TABLE "hawb" DROP CONSTRAINT "FK_08274583a2e2fe0c52973d1b62c"`);
        await queryRunner.query(`ALTER TABLE "hawb" DROP CONSTRAINT "FK_083a54972a5a3925f897537250b"`);
        await queryRunner.query(`ALTER TABLE "hawb" DROP CONSTRAINT "FK_853ed7019685c18cd666e4d8917"`);
        await queryRunner.query(`ALTER TABLE "hawb" DROP CONSTRAINT "FK_61f07c672ef39ccdfeaee1d392f"`);
        await queryRunner.query(`ALTER TABLE "hawb_dimension" DROP CONSTRAINT "FK_60d8fa0deffbdcce6e26e2799a5"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "third_by"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "third_to"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "second_by"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "second_to"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "by_first_carrier"`);
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "to"`);
        await queryRunner.query(`DROP TABLE "hawb"`);
        await queryRunner.query(`DROP TABLE "hawb_accounting"`);
        await queryRunner.query(`DROP TABLE "hawb_dimension"`);
        await queryRunner.query(`DROP TABLE "hawb_agent"`);
    }

}
