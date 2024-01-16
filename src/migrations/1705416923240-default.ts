import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705416923240 implements MigrationInterface {
    name = 'Default1705416923240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`professores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`morada\` varchar(255) NOT NULL, \`bi\` varchar(12) NOT NULL, \`lincenciado\` tinyint NOT NULL DEFAULT 1, \`dob\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`professores\``);
    }

}
