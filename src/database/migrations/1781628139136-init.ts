import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1781628139136 implements MigrationInterface {
    name = 'Init1781628139136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounting"."debit_note_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "s_no" integer NOT NULL, "particulars" character varying(255) NOT NULL, "amount" numeric(10,2) NOT NULL, "debitNoteId" integer, CONSTRAINT "PK_713b7d37713ddd1ef1981ff3a8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounting"."debit_note" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "debit_note_no" character varying(20) NOT NULL, "date" date NOT NULL, "is_usd" boolean NOT NULL DEFAULT false, "grandtotal" numeric(10,2) NOT NULL, "in_words" character varying(255) NOT NULL, "shipper_id" integer, "consignee_id" integer, "agent_id" integer, CONSTRAINT "PK_61315fec6516afb787d01de857c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounting"."credit_note_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "s_no" integer NOT NULL, "particulars" character varying(255) NOT NULL, "amount" numeric(10,2) NOT NULL, "creditNoteId" integer, CONSTRAINT "PK_7b0e7bd7812ea56a8efc6e420f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounting"."credit_note_hawbs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "creditNoteId" integer NOT NULL, "hawbId" integer NOT NULL, CONSTRAINT "PK_18960de45397a5968154878daa2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounting"."credit_note" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "credit_note_no" character varying(20) NOT NULL, "date" date NOT NULL, "is_usd" boolean NOT NULL DEFAULT false, "grandtotal" numeric(10,2) NOT NULL, "in_words" character varying(255) NOT NULL, "shipper_id" integer, "consignee_id" integer, "agent_id" integer, "mawb_id" integer NOT NULL, CONSTRAINT "PK_1f08d9f374b8db39fd4c8e789df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note_items" ADD CONSTRAINT "FK_c6b225caacd02b922715b139fca" FOREIGN KEY ("debitNoteId") REFERENCES "accounting"."debit_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" ADD CONSTRAINT "FK_99da15a7319bf3edb87f986df35" FOREIGN KEY ("shipper_id") REFERENCES "common"."shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" ADD CONSTRAINT "FK_75d7f286dadc1aca9d9b5e4c1e4" FOREIGN KEY ("consignee_id") REFERENCES "common"."consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" ADD CONSTRAINT "FK_07b12955f3c0502fd2d72dff546" FOREIGN KEY ("agent_id") REFERENCES "common"."agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note_items" ADD CONSTRAINT "FK_f9e20a16d75bcf10db2a39291c2" FOREIGN KEY ("creditNoteId") REFERENCES "accounting"."credit_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note_hawbs" ADD CONSTRAINT "FK_35f5971b035b7a6992d35dd1e91" FOREIGN KEY ("creditNoteId") REFERENCES "accounting"."credit_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note_hawbs" ADD CONSTRAINT "FK_7e25493c920f0878afeeda01917" FOREIGN KEY ("hawbId") REFERENCES "hawb"."hawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ADD CONSTRAINT "FK_4151db805321384cccb73953d19" FOREIGN KEY ("shipper_id") REFERENCES "common"."shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ADD CONSTRAINT "FK_b31971b586c6e2d87316f636796" FOREIGN KEY ("consignee_id") REFERENCES "common"."consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ADD CONSTRAINT "FK_c086b4107597e6dd5a4cb9e521d" FOREIGN KEY ("agent_id") REFERENCES "common"."agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ADD CONSTRAINT "FK_ffd7c274fa9a78b839a42b07e4c" FOREIGN KEY ("mawb_id") REFERENCES "mawb"."mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" DROP CONSTRAINT "FK_ffd7c274fa9a78b839a42b07e4c"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" DROP CONSTRAINT "FK_c086b4107597e6dd5a4cb9e521d"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" DROP CONSTRAINT "FK_b31971b586c6e2d87316f636796"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" DROP CONSTRAINT "FK_4151db805321384cccb73953d19"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note_hawbs" DROP CONSTRAINT "FK_7e25493c920f0878afeeda01917"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note_hawbs" DROP CONSTRAINT "FK_35f5971b035b7a6992d35dd1e91"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note_items" DROP CONSTRAINT "FK_f9e20a16d75bcf10db2a39291c2"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" DROP CONSTRAINT "FK_07b12955f3c0502fd2d72dff546"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" DROP CONSTRAINT "FK_75d7f286dadc1aca9d9b5e4c1e4"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" DROP CONSTRAINT "FK_99da15a7319bf3edb87f986df35"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note_items" DROP CONSTRAINT "FK_c6b225caacd02b922715b139fca"`);
        await queryRunner.query(`DROP TABLE "accounting"."credit_note"`);
        await queryRunner.query(`DROP TABLE "accounting"."credit_note_hawbs"`);
        await queryRunner.query(`DROP TABLE "accounting"."credit_note_items"`);
        await queryRunner.query(`DROP TABLE "accounting"."debit_note"`);
        await queryRunner.query(`DROP TABLE "accounting"."debit_note_items"`);
    }

}
