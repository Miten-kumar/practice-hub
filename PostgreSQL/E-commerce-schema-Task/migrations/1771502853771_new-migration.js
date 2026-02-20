export const up = (pgm) => {
  pgm.createTable("users", {
    users_id: { type: "integer", primaryKey: true },
    name: { type: "text" },
    email: { type: "text" },
    password: { type: "text" },
  });

  pgm.createTable("product", {
    product_id: { type: "integer", primaryKey: true },
    users_id: {
      type: "integer",
      references: '"users"(users_id)',
      onDelete: "CASCADE",
    },
    name: { type: "text" },
    title: { type: "text" },
    description: { type: "text" },
    price: { type: "float" },
    quantity: { type: "integer" },
  });

  pgm.createTable("address", {
    address_id: { type: "integer", primaryKey: true },
    users_id: {
      type: "integer",
      references: '"users"(users_id)',
      onDelete: "CASCADE",
    },
    product_id: {
      type: "integer",
      references: "product(product_id)",
      onDelete: "SET NULL",
    },
    house_no: { type: "integer" },
    street: { type: "text" },
    area: { type: "text" },
    city: { type: "text" },
    state: { type: "text" },
    country: { type: "text" },
    pincode: { type: "integer" },
  });

  pgm.createTable("review", {
    review_id: { type: "integer", primaryKey: true },
    users_id: {
      type: "integer",
      references: '"users"(users_id)',
      onDelete: "CASCADE",
    },
    count: { type: "integer" },
    likes: { type: "integer" },
  });

  pgm.createTable("orders", {
    orders_id: { type: "integer", primaryKey: true },
    users_id: {
      type: "integer",
      references: '"users"(users_id)',
      onDelete: "CASCADE",
    },
    product_id: {
      type: "integer",
      references: "product(product_id)",
      onDelete: "RESTRICT",
    },
    amount: { type: "float" },
    order_date: { type: "date" },
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
  pgm.dropTable("product");
  pgm.dropTable("orders");
  pgm.dropTable("address");
  pgm.dropTable("review");
};
