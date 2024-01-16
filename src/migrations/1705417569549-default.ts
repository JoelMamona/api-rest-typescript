import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1705417569549 implements MigrationInterface {
    name = 'Default1705417569549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`professores\` CHANGE \`lincenciado\` \`licenciado\` tinyint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`professores\` CHANGE \`licenciado\` \`lincenciado\` tinyint NOT NULL DEFAULT '1'`);
    }

}
