/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "id", primaryKey: true },
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    contact_no: { type: "varchar(20)", notNull: true, unique: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("products", {
    product_id: { type: "id", primaryKey: true },
    name: { type: "varchar(100)", notNull: true },
    description: { type: "varchar(255)", notNull: true },
    price: { type: "numeric(10,2)", notNull: true },
  });


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
        foreignKeys: [
          {
            columns: "user_id",
            references: "users(id)",
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
        foreignKeys: [
          {
            columns: "user_id",
            references: "users(id)",
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
};
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("reviews");
  pgm.dropTable("orders");
  pgm.dropTable("products");
  pgm.dropTable("users");
};
