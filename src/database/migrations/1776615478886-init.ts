import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776615478886 implements MigrationInterface {
    name = 'Init1776615478886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consignee" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(100), "po_box_number" character varying(20), "phone_number" character varying(20), "office_number" character varying(20), "address" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, CONSTRAINT "UQ_5cc009166ab66bc8ef58b8d2f58" UNIQUE ("name"), CONSTRAINT "UQ_b60abaf6980f6a979d224954083" UNIQUE ("email"), CONSTRAINT "PK_1bfdc8f4a0d0ec362948638b2a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipper" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "deletedAt" TIMESTAMP, "name" character varying(100) NOT NULL, "email" character varying(100), "po_box_number" character varying(20), "phone_number" character varying(20), "office_number" character varying(20), "address" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, CONSTRAINT "UQ_69d4c9861753935d7e6b7655009" UNIQUE ("name"), CONSTRAINT "UQ_fc9acc1aab0a1db4a57ba15f2d2" UNIQUE ("email"), CONSTRAINT "PK_b83858f68f5c3acfab73b61caa5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipper"`);
        await queryRunner.query(`DROP TABLE "consignee"`);
    }

}
