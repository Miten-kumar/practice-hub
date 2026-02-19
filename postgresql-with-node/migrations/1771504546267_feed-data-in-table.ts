import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        INSERT INTO users (name, email, mobileNo, password) VALUES
        ('Ajay Singh', 'ajay@example.com', '9876543210', 'hashed_password_1'),
        ('Manush Patel', 'manush@example.com', '9876501234', 'hashed_password_2'),
        ('Riya Sharma', 'riya@example.com', '9876512345', 'hashed_password_3');

    `);

  pgm.sql(`
        INSERT INTO products (prod_name, prod_description, price, stock) VALUES
        ('Running Shoes', 'Comfortable running shoes for daily jogging', 2999.99, 50),
        ('Wireless Headphones', 'Noise cancelling bluetooth headphones', 4999.00, 30),
        ('Laptop Backpack', 'Water resistant backpack for laptops', 1999.50, 100);

    `);

  pgm.sql(`
        INSERT INTO orders (user_id, product_id, quantity, price) VALUES
        (1, 1, 1, 2999.99),
        (2, 2, 2, 9998.00),
        (3, 3, 1, 1999.50);
    `);

  pgm.sql(`
        INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
        (1, 1, 5, 'Excellent quality and very comfortable'),
        (2, 2, 4, 'Great sound quality but battery could be better'),
        (3, 3, 5, 'Very durable and stylish backpack');
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql("DELETE FROM reviews;");
  pgm.sql("DELETE FROM orders;");
  pgm.sql("DELETE FROM products;");
  pgm.sql("DELETE FROM users;");
}
