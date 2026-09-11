import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1779010338305 implements MigrationInterface {
    name = 'Init1779010338305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounting"."tax-invoice-items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "s_no" integer NOT NULL, "hs_code" character varying(10), "particulars" character varying(255) NOT NULL, "quantity" integer, "rate" numeric(10,2) NOT NULL, "amount" numeric(10,2) NOT NULL, "taxInvoiceId" integer, CONSTRAINT "PK_1b6eb2a84c7b4362e952d4a871f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounting"."tax-invoice" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "invoice_no" character varying(20) NOT NULL, "date" date NOT NULL, "mawb_id" integer NOT NULL, "is_usd" boolean NOT NULL DEFAULT false, "sub_total" numeric(10,2) NOT NULL, "discount" numeric(10,2), "taxable_amount" numeric(10,2) NOT NULL, "vat_rate" numeric(10,2), "vat_amount" numeric(10,2), "grandtotal" numeric(10,2) NOT NULL, "in_words" character varying(255) NOT NULL, "shipper_id" integer, "consignee_id" integer, "agent_id" integer, CONSTRAINT "PK_18bfdf244b91af5b5a98a43c55a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounting"."tax-invoice-hawbs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "invoiceId" integer, "hawbId" integer, CONSTRAINT "PK_19946a4e3abdbf7f13707cb62d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "common"."company_bank" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "bank_name" character varying(100) NOT NULL, "bank_address" character varying(255) NOT NULL, "bank_city" character varying(100) NOT NULL, "bank_country" character varying(100) NOT NULL, "bank_zip_code" character varying(20), "bank_phone_number" character varying(50), "bank_email" character varying(100), "bank_ifsc_code" character varying(20), "bank_account_number" character varying(50) NOT NULL, "fax_no" character varying(50), "telex" character varying(50), "swift" character varying(20), "bank_account_holder_name" character varying(100) NOT NULL, "bank_branch" character varying(100) NOT NULL, "is_usd" boolean NOT NULL DEFAULT false, "company_id" integer, CONSTRAINT "PK_7bd096a21edaed3f7ce7fee6ef3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "common"."company" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "alias" character varying(100) NOT NULL, "po_box_number" character varying(50) NOT NULL, "phone_number" character varying(50), "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "country" character varying(100) NOT NULL, "office_number_1" character varying(50), "office_number_2" character varying(50), "office_number_3" character varying(50), "email" character varying(100), "is_vat" boolean NOT NULL DEFAULT false, "vat_pan_number" character varying(50) NOT NULL, "logo" character varying(255), CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "currencies" ALTER COLUMN "code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currencies" ALTER COLUMN "currency" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice-items" ADD CONSTRAINT "FK_f5f555e5059b5db1d9b443ecab1" FOREIGN KEY ("taxInvoiceId") REFERENCES "accounting"."tax-invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" ADD CONSTRAINT "FK_131c4f6b61849457a7cc38687ba" FOREIGN KEY ("shipper_id") REFERENCES "common"."shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" ADD CONSTRAINT "FK_4c133c9f9e36253c4698d896397" FOREIGN KEY ("consignee_id") REFERENCES "common"."consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" ADD CONSTRAINT "FK_5258e078cd48b0df515c27f8130" FOREIGN KEY ("agent_id") REFERENCES "common"."agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" ADD CONSTRAINT "FK_e9949d206c3f2bedd138a99c919" FOREIGN KEY ("mawb_id") REFERENCES "mawb"."mawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice-hawbs" ADD CONSTRAINT "FK_6f901f04714e483594173e4be99" FOREIGN KEY ("invoiceId") REFERENCES "accounting"."tax-invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice-hawbs" ADD CONSTRAINT "FK_88b410d322d6c0c166394005ac9" FOREIGN KEY ("hawbId") REFERENCES "hawb"."hawb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "common"."company_bank" ADD CONSTRAINT "FK_3d4d65999c92911b8d2deb4c63c" FOREIGN KEY ("company_id") REFERENCES "common"."company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "common"."company_bank" DROP CONSTRAINT "FK_3d4d65999c92911b8d2deb4c63c"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice-hawbs" DROP CONSTRAINT "FK_88b410d322d6c0c166394005ac9"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice-hawbs" DROP CONSTRAINT "FK_6f901f04714e483594173e4be99"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" DROP CONSTRAINT "FK_e9949d206c3f2bedd138a99c919"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" DROP CONSTRAINT "FK_5258e078cd48b0df515c27f8130"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" DROP CONSTRAINT "FK_4c133c9f9e36253c4698d896397"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice" DROP CONSTRAINT "FK_131c4f6b61849457a7cc38687ba"`);
        await queryRunner.query(`ALTER TABLE "accounting"."tax-invoice-items" DROP CONSTRAINT "FK_f5f555e5059b5db1d9b443ecab1"`);
        await queryRunner.query(`ALTER TABLE "currencies" ALTER COLUMN "currency" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "currencies" ALTER COLUMN "code" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "common"."company"`);
        await queryRunner.query(`DROP TABLE "common"."company_bank"`);
        await queryRunner.query(`DROP TABLE "accounting"."tax-invoice-hawbs"`);
        await queryRunner.query(`DROP TABLE "accounting"."tax-invoice"`);
        await queryRunner.query(`DROP TABLE "accounting"."tax-invoice-items"`);
    }

}
