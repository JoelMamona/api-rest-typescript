import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705414105583 implements MigrationInterface {
    name = 'Default1705414105583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` DROP FOREIGN KEY \`FK_aa9f331e33536d086ab324398b2\``);
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` ADD CONSTRAINT \`FK_aa9f331e33536d086ab324398b2\` FOREIGN KEY (\`aluno_id\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` DROP FOREIGN KEY \`FK_aa9f331e33536d086ab324398b2\``);
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` ADD CONSTRAINT \`FK_aa9f331e33536d086ab324398b2\` FOREIGN KEY (\`aluno_id\`) REFERENCES \`alunos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
