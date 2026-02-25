import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    user_id: { type: "id", primaryKey: true },
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    contact_no: { type: "varchar(20)", notNull: true, unique: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable(
    "products",
    {
      product_id: { type: "id", primaryKey: true },
      name: { type: "varchar(100)", notNull: true },
      description: { type: "varchar(255)", notNull: true },
      price: { type: "numeric(10,2)", notNull: true },
      stock: { type: "integer", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    {
      constraints: {
        check: ["price >= 0", "stock >= 0"],
      },
    },
  );

  pgm.createTable(
    "orders",
    {
      order_id: { type: "id", primaryKey: true },
      user_id: { type: "integer", notNull: true },
      product_id: { type: "integer", notNull: true },
      quantity: { type: "integer", notNull: true },
      unit_price: { type: "numeric(10,2)", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    {
      constraints: {
        check: "quantity > 0",
        foreignKeys: [
          {
            columns: "user_id",
            references: "users(user_id)",
            onDelete: "CASCADE",
          },
          {
            columns: "product_id",
            references: "products(product_id)",
            onDelete: "CASCADE",
          },
        ],
      },
    },
  );

  pgm.createTable(
    "reviews",
    {
      review_id: { type: "id", primaryKey: true },
      user_id: { type: "integer", notNull: true },
      product_id: { type: "integer", notNull: true },
      rating: { type: "integer", notNull: true },
      comment: { type: "varchar(255)", notNull: true },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    {
      constraints: {
        check: "rating >= 1 AND rating <= 5",
        foreignKeys: [
          {
            columns: "user_id",
            references: "users(user_id)",
            onDelete: "CASCADE",
          },
          {
            columns: "product_id",
            references: "products(product_id)",
            onDelete: "CASCADE",
          },
        ],
        unique: ["user_id", "product_id"],
      },
    },
  );

  pgm.addIndex("orders", "user_id");
  pgm.addIndex("orders", "product_id");
  pgm.addIndex("orders", ["user_id", "product_id"]);
  pgm.addIndex("reviews", "user_id");
  pgm.addIndex("reviews", "product_id");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("reviews");
  pgm.dropTable("orders");
  pgm.dropTable("products");
  pgm.dropTable("users");
}
