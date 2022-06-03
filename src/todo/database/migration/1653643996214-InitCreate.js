const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitCreate1653643996214 {
    name = 'InitCreate1653643996214'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createOn" TIMESTAMP NOT NULL DEFAULT now(), "todoId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5e18fff6d62959da212066f2882" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_91440d017e7b30d2ac16a27d762" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_91440d017e7b30d2ac16a27d762"`);
        await queryRunner.query(`DROP TABLE "todo_entity"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }
}
