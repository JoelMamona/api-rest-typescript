import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705417824773 implements MigrationInterface {
    name = 'Default1705417824773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`professores\` DROP COLUMN \`bi\``);
        await queryRunner.query(`ALTER TABLE \`professores\` ADD \`bi\` varchar(15) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`professores\` DROP COLUMN \`bi\``);
        await queryRunner.query(`ALTER TABLE \`professores\` ADD \`bi\` varchar(12) NOT NULL`);
    }

}
