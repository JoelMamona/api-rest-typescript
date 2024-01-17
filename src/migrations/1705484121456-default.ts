import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705484121456 implements MigrationInterface {
    name = 'Default1705484121456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`dob\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`dob\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP COLUMN \`dob\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD \`dob\` datetime NOT NULL`);
    }

}
