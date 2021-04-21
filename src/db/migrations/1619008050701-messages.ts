import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class messages1619008050701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'message',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                }, {
                    name:'admin_id',
                    type:'uuid',
                    isNullable:true
                },
                {
                    name:'user_id',
                    type: 'uuid',
                },
                {
                    name:'text',
                    type: 'varchar'
                }, 
                {
                    name:'created_at',
                    type: 'timestamp',
                    default:'now()'
                }
            ],
            foreignKeys:[
                {
                    name:'fk_user',
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    columnNames:['user_id'],
                    onDelete:'set null',
                    onUpdate: 'set null'
                    
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('messages')
    }

}
