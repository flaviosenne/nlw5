import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class user1619006292103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true
                },
                {
                    name:'email',
                    type: 'varchar'
                }, {
                    name:'created_at',
                    type:'timestamp',
                    default:'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('user')
    }

}
