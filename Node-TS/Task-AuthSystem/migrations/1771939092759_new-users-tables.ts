import { MigrationBuilder } from 'node-pg-migrate';
import type { ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()'), 
        },
        email: {
            type: 'varchar(255)',
            notNull: true,
            unique: true, 
        },
        role: {
            type: 'varchar(50)',
            notNull: true,
            default: 'user', 
        },
        password: {
            type: 'varchar(255)', 
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'), 
        },
    });
}


export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('users');
}
