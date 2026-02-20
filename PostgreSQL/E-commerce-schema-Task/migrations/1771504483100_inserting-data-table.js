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
  (pgm.db.query({
    text: `INSERT INTO users (users_id, name, email, password) VALUES
(1, 'Emma Watson', 'emma.w@example.com', 'hash_abc123'),
(2, 'Liam Neeson', 'liam.n@example.com', 'hash_def456'),
(3, 'Olivia Pope', 'olivia.p@example.com', 'hash_ghi789'),
(4, 'Noah Arc', 'noah.a@example.com', 'hash_jkl012'),
(5, 'Ava Max', 'ava.m@example.com', 'hash_mno345'),
(6, 'Ethan Hunt', 'ethan.h@example.com', 'hash_pqr678');`,
  }),
    pgm.db.query({
      text: `INSERT INTO product (product_id, users_id, name, title, description, price, quantity) VALUES
(1, 1, 'Smartphone', 'Galaxy S23 Ultra', 'Flagship smartphone with an amazing camera.', 1199.99, 45),
(2, 1, 'Tablet', 'iPad Air 5th Gen', 'Lightweight and powerful tablet for creatives.', 599.00, 80),
(3, 1, 'Smartwatch', 'Apple Watch Series 8', 'Advanced health and fitness tracker.', 399.50, 150),
(4, 1, 'Earbuds', 'AirPods Pro 2', 'Active noise cancellation wireless earbuds.', 249.00, 300),
(5, 2, 'Desk Chair', 'ErgoPro 5000', 'Breathable mesh ergonomic office chair.', 189.99, 60),
(6, 2, 'Standing Desk', 'FlexiSpot Motorized', 'Adjustable height desk with memory presets.', 349.50, 25),
(7, 2, 'Monitor', 'Dell UltraSharp 27', '4K USB-C monitor for professional color grading.', 450.00, 40),
(8, 2, 'Keyboard', 'Keychron K2', 'Mechanical wireless keyboard for Mac/Windows.', 79.99, 120),
(9, 2, 'Webcam', 'Logitech C920x', '1080p HD camera for streaming and calls.', 59.99, 95);`,
    }),
    pgm.db.query({
      text: `INSERT INTO address (address_id, users_id, product_id, house_no, street, area, city, state, country, pincode) VALUES
(1, 1, NULL, 101, 'Spring Blvd', 'Uptown', 'New York', 'NY', 'USA', 10001),
(2, 2, NULL, 202, 'Summer Ln', 'Midtown', 'Atlanta', 'GA', 'USA', 30301),
(3, 3, NULL, 303, 'Autumn Dr', 'Downtown', 'Chicago', 'IL', 'USA', 60601),
(4, 4, NULL, 404, 'Winter Cir', 'Westside', 'Denver', 'CO', 'USA', 80201),
(5, 5, NULL, 505, 'Rainy Ct', 'Eastside', 'Portland', 'OR', 'USA', 97201),
(6, 6, NULL, 606, 'Sunny Blvd', 'Southside', 'Miami', 'FL', 'USA', 33101),
(7, 3, 7, 707, 'Business Park', 'Commercial', 'Chicago', 'IL', 'USA', 60605); `,
    }),
    pgm.db.query({
      text: `INSERT INTO review (review_id, users_id, count, likes) VALUES
      (1, 3, 5, 24),
      (2, 4, 4, 12),
      (3, 5, 2, 3),
      (4, 6, 5, 89),
      (5, 3, 3, 7),
      (6, 4, 5, 41),
      (7, 5, 4, 15),
      (8, 6, 1, 55);`,
    }),
    pgm.db.query({
      text: `INSERT INTO orders (orders_id, users_id, product_id, amount, order_date) VALUES
      (1, 3, 1, 1199.99, '2024-01-15'),
      (2, 4, 5, 189.99, '2024-01-18'),
      (3, 5, 7, 450.00, '2024-01-22'),
      (4, 6, 8, 79.99, '2024-02-05'),
      (5, 3, 4, 249.00, '2024-02-14'),
      (6, 4, 2, 599.00, '2024-02-20'),
      (7, 5, 9, 59.99, '2024-03-01'),
      (8, 6, 3, 399.50, '2024-03-10'),
      (9, 3, 6, 349.50, '2024-03-15'),
      (10, 4, 1, 1199.99, '2024-03-22'),
      (11, 5, 8, 79.99, '2024-04-05'),
      (12, 6, 4, 249.00, '2024-04-12');`,
    }));
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.db.query({
    text:`TRUNCATE TABLE users`
  }),
  pgm.db.query({
    text:`TRUNCATE TABLE product`
  }),pgm.db.query({
    text:`TRUNCATE TABLE address`
  }),pgm.db.query({
    text:`TRUNCATE TABLE review`
  }),
  pgm.db.query({
    text:`TRUNCATE TABLE orders`
  })
};
