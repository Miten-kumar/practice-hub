import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        INSERT INTO users (name, email, "mobile_no", password) VALUES
        ('Ajay Singh', 'ajay@example.com', '9876543210', 'hashed_password_1'),
        ('Manush Patel', 'manush@example.com', '9876501234', 'hashed_password_2'),
        ('Riya Sharma', 'riya@example.com', '9876512345', 'hashed_password_3'),
        ('Sanjay Kumar', 'sanjay@example.com', '9876523456', 'hashed_password_4'),
        ('Neha Gupta', 'neha@example.com', '9876534567', 'hashed_password_5'),
        ('Vikram Singh', 'vikram@example.com', '9876545678', 'hashed_password_6'),
        ('Anjali Mehta', 'anjali@example.com', '9876556789', 'hashed_password_7');

    `);

  pgm.sql(`
        INSERT INTO products (prod_name, prod_description, price, stock) VALUES
        ('Running Shoes', 'Comfortable running shoes for daily jogging', 2999.99, 50),
        ('Wireless Headphones', 'Noise cancelling bluetooth headphones', 4999.00, 30),
        ('Laptop Backpack', 'Water resistant backpack for laptops', 1999.50, 100),
        ('Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 3999.99, 20),
        ('Gaming Mouse', 'High precision gaming mouse with customizable buttons', 1499.00, 75),
        ('4K Monitor', '27 inch 4K UHD monitor with HDR support', 7999.99, 15),
        ('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches', 2499.50, 40);

    `);

  pgm.sql(`
        INSERT INTO orders (user_id, product_id, quantity, price) VALUES
        (1, 1, 1, 2999.99),
        (2, 2, 2, 9998.00),
        (3, 3, 1, 1999.50),
        (1, 2, 1, 4999.00),
        (2, 3, 3, 5998.50),
        (3, 1, 2, 5999.98),
        (1, 3, 1, 1999.50);
    `);

  pgm.sql(`
        INSERT INTO reviews (user_id, product_id, rating, comment) VALUES
        (2, 2, 4, 'Great sound quality but battery could be better'),
        (3, 3, 5, 'Very durable and stylish backpack'),
        (1, 2, 4, 'Good value for the price'),
        (2, 3, 5, 'Perfect for carrying my laptop and accessories'),
        (3, 1, 4, 'Good running shoes but a bit pricey'),
        (1, 3, 5, 'Highly recommend this backpack for students');
     `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql("DELETE FROM reviews;");
  pgm.sql("DELETE FROM orders;");
  pgm.sql("DELETE FROM products;");
  pgm.sql("DELETE FROM users;");
}
