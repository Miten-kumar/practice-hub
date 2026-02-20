import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  /* =======================
     USERS
  ======================= */
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    mobile_no: {
      type: "varchar(20)",
      notNull: true,
    },
    password: {
      type: "varchar(255)",
      notNull: true,
    },
  });

  pgm.createIndex("users", "email", {
    name: "idx_users_email",
  });

  /* =======================
     PRODUCTS
  ======================= */
  pgm.createTable("products", {
    prod_id: {
      type: "serial",
      primaryKey: true,
    },
    prod_name: {
      type: "varchar(255)",
      notNull: true,
    },
    prod_description: {
      type: "text",
    },
    price: {
      type: "numeric(10,2)",
      notNull: true,
    },
    stock: {
      type: "int",
      notNull: true,
    },
  });

  pgm.createIndex("products", "prod_name", {
    name: "idx_product_name",
  });

  // GIN full-text index (raw SQL)
  pgm.sql(`
    CREATE INDEX idx_product_description
    ON products
    USING gin (to_tsvector('english', prod_description));
  `);

  /* =======================
     ORDERS
  ======================= */
  pgm.createTable("orders", {
    order_id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "int",
      notNull: true,
      references: "users(id)",
    },
    product_id: {
      type: "int",
      notNull: true,
      references: "products(prod_id)",
    },
    quantity: {
      type: "int",
      notNull: true,
    },
    price: {
      type: "numeric(10,2)",
      notNull: true,
    },
    order_date: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("orders", "user_id", {
    name: "idx_orders_user_id",
  });

  pgm.createIndex("orders", "product_id", {
    name: "idx_orders_product_id",
  });

  /* =======================
     REVIEWS
  ======================= */
  pgm.createTable("reviews", {
    review_id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: "int",
      notNull: true,
      references: "users(id)",
    },
    product_id: {
      type: "int",
      notNull: true,
      references: "products(prod_id)",
    },
    rating: {
      type: "int",
      check: "rating >= 1 AND rating <= 5",
    },
    comment: {
      type: "text",
    },
    review_date: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createIndex("reviews", "user_id", {
    name: "idx_reviews_user_id",
  });

  pgm.createIndex("reviews", "product_id", {
    name: "idx_reviews_product_id",
  });
}

/* =======================
   DOWN (rollback)
======================= */
export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("reviews");
  pgm.dropTable("orders");
  pgm.dropTable("products");
  pgm.dropTable("users");
}
