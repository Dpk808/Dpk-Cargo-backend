











// Self Created Table in Database for Currencies. This table will be used to store the list of currencies and their details. 
// This will be used in the future for currency conversion and other related functionalities.
// Do not run this migration as it is not needed for the current functionality and it will create an unnecessary table in the database. 
// This migration is created for future use and it can be run when needed.






















// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class CreateCurrencies1779000000000 implements MigrationInterface {
//   name = 'CreateCurrencies1779000000000';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `CREATE TABLE "currencies" ("id" SERIAL NOT NULL, "code" character varying(3) NOT NULL, "code_numeric" integer, "currency" character varying(100) NOT NULL, CONSTRAINT "PK_9ef8b9df3dd9d4a16acaa4981fd" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `INSERT INTO "currencies" ("code", "code_numeric", "currency") VALUES
//         ('NPR', 524, 'Nepalese Rupee'),
//         ('USD', 840, 'US Dollar'),
//         ('EUR', 978, 'Euro'),
//         ('GBP', 826, 'British Pound'),
//         ('AUD', 36, 'Australian Dollar'),
//         ('CAD', 124, 'Canadian Dollar'),
//         ('SGD', 702, 'Singapore Dollar'),
//         ('JPY', 392, 'Japanese Yen'),
//         ('CNY', 156, 'Chinese Yuan'),
//         ('INR', 356, 'Indian Rupee'),
//         ('AED', 784, 'United Arab Emirates Dirham'),
//         ('SAR', 682, 'Saudi Riyal'),
//         ('QAR', 634, 'Qatari Riyal'),
//         ('BHD', 48, 'Bahraini Dinar'),
//         ('OMR', 512, 'Omani Rial'),
//         ('KWD', 414, 'Kuwaiti Dinar')`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`DROP TABLE "currencies"`);
//   }
// }