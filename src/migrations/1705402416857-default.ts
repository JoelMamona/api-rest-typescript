import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705402416857 implements MigrationInterface {
    name = 'Default1705402416857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`nome\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`morada\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`morada\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`morada\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`morada\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`nome\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`nome\` text NOT NULL`);
    }

}
