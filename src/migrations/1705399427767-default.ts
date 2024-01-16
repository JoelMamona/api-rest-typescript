import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705399427767 implements MigrationInterface {
    name = 'Default1705399427767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alunos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`morada\` text NOT NULL, \`dob\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disciplinas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`descricao\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disciplina_aluno\` (\`disciplina_id\` int NOT NULL, \`aluno_id\` int NOT NULL, INDEX \`IDX_55df68c67828b0c4e5a7a047a4\` (\`disciplina_id\`), INDEX \`IDX_aa9f331e33536d086ab324398b\` (\`aluno_id\`), PRIMARY KEY (\`disciplina_id\`, \`aluno_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` ADD CONSTRAINT \`FK_55df68c67828b0c4e5a7a047a46\` FOREIGN KEY (\`disciplina_id\`) REFERENCES \`disciplinas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` ADD CONSTRAINT \`FK_aa9f331e33536d086ab324398b2\` FOREIGN KEY (\`aluno_id\`) REFERENCES \`alunos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` DROP FOREIGN KEY \`FK_aa9f331e33536d086ab324398b2\``);
        await queryRunner.query(`ALTER TABLE \`disciplina_aluno\` DROP FOREIGN KEY \`FK_55df68c67828b0c4e5a7a047a46\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa9f331e33536d086ab324398b\` ON \`disciplina_aluno\``);
        await queryRunner.query(`DROP INDEX \`IDX_55df68c67828b0c4e5a7a047a4\` ON \`disciplina_aluno\``);
        await queryRunner.query(`DROP TABLE \`disciplina_aluno\``);
        await queryRunner.query(`DROP TABLE \`disciplinas\``);
        await queryRunner.query(`DROP TABLE \`alunos\``);
    }

}
