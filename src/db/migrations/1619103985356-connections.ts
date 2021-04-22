import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class connections1619103985356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'connection',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                }, {
                    name: 'admin_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'socket_id',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ]
        }))
        await queryRunner.createForeignKey(
            'connection',
            new TableForeignKey({
                name: 'fk_connection',
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'set null',
                onUpdate: 'set null'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('connection', 'fk_connection')
        return await queryRunner.dropTable('connection')
    }

}
