import { MigrationBuilder } from "node-pg-migrate";
export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    id: {
      type: "id",
      primaryKey: true,
    },
    email: {
      type: "text",
      notNull: true,
      unique: true,
    },
    password_hash: {
      type: "text",
      notNull: true,
    },
    role: {
      type: "text",
      notNull: true,
      default: "user",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
