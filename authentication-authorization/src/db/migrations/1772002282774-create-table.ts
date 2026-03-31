import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTable1772002282774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "text",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "first_name",
            type: "text",
            isNullable: false,
          },
          {
            name: "last_name",
            type: "text",
            isNullable: false,
          },
          {
            name: "contact_number",
            type: "text",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "age",
            type: "integer",
            isNullable: false,
          },
          {
            name: "gender",
            type: "text",
            isNullable: false,
          },
          {
            name: "password",
            type: "text",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            isNullable: false,
          },
        ],
        checks: [
          {
            columnNames: ["age"],
            expression: "age >= 12 AND age <= 75",
          },
          {
            columnNames: ["gender"],
            expression: "gender IN ('male', 'female', 'other')",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
