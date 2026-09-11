import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1783355074153 implements MigrationInterface {
    name = 'Init1783355074153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounting"."debit_note_hawbs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "debitNoteId" integer NOT NULL, "hawbId" integer NOT NULL, CONSTRAINT "PK_d55176fa807fa08370b235aa22b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" ADD "mawb_id" integer`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" DROP CONSTRAINT "FK_ffd7c274fa9a78b839a42b07e4c"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ALTER COLUMN "mawb_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note_hawbs" ADD CONSTRAINT "FK_b7f1797315b61306942a4ee8e73" FOREIGN KEY ("debitNoteId") REFERENCES "accounting"."debit_note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note_hawbs" ADD CONSTRAINT "FK_dc333cd8333868ff711a0be889d" FOREIGN KEY ("hawbId") REFERENCES "hawb"."hawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" ADD CONSTRAINT "FK_98f075dc46c678ec52a4597afe2" FOREIGN KEY ("mawb_id") REFERENCES "mawb"."mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ADD CONSTRAINT "FK_ffd7c274fa9a78b839a42b07e4c" FOREIGN KEY ("mawb_id") REFERENCES "mawb"."mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" DROP CONSTRAINT "FK_ffd7c274fa9a78b839a42b07e4c"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" DROP CONSTRAINT "FK_98f075dc46c678ec52a4597afe2"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note_hawbs" DROP CONSTRAINT "FK_dc333cd8333868ff711a0be889d"`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note_hawbs" DROP CONSTRAINT "FK_b7f1797315b61306942a4ee8e73"`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ALTER COLUMN "mawb_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounting"."credit_note" ADD CONSTRAINT "FK_ffd7c274fa9a78b839a42b07e4c" FOREIGN KEY ("mawb_id") REFERENCES "mawb"."mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."debit_note" DROP COLUMN "mawb_id"`);
        await queryRunner.query(`DROP TABLE "accounting"."debit_note_hawbs"`);
    }

}
