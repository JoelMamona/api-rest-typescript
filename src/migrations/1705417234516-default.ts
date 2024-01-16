import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705417234516 implements MigrationInterface {
    name = 'Default1705417234516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`disciplinas\` ADD \`professorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`disciplinas\` ADD CONSTRAINT \`FK_232d5a267f4b581eb89cbb4fba0\` FOREIGN KEY (\`professorId\`) REFERENCES \`professores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`disciplinas\` DROP FOREIGN KEY \`FK_232d5a267f4b581eb89cbb4fba0\``);
        await queryRunner.query(`ALTER TABLE \`disciplinas\` DROP COLUMN \`professorId\``);
    }

}
