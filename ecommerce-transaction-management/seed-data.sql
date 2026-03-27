BEGIN;

-- Optional cleanup if you want to reseed from scratch.
TRUNCATE TABLE payments, orders, products, users RESTART IDENTITY CASCADE;

INSERT INTO users (user_id, "firstName", "lastName", email) VALUES
  (1, 'Aarav', 'Sharma', 'aarav.sharma@example.com'),
  (2, 'Diya', 'Patel', 'diya.patel@example.com'),
  (3, 'Rohan', 'Mehta', 'rohan.mehta@example.com'),
  (4, 'Anaya', 'Reddy', 'anaya.reddy@example.com'),
  (5, 'Kabir', 'Singh', 'kabir.singh@example.com'),
  (6, 'Ishita', 'Gupta', 'ishita.gupta@example.com'),
  (7, 'Vivaan', 'Nair', 'vivaan.nair@example.com'),
  (8, 'Myra', 'Joshi', 'myra.joshi@example.com'),
  (9, 'Arjun', 'Kapoor', 'arjun.kapoor@example.com'),
  (10, 'Saanvi', 'Iyer', 'saanvi.iyer@example.com');

INSERT INTO products (prod_id, prod_name, stock, price, version) VALUES
  (1, 'Wireless Mouse', 120, 799.00, 1),
  (2, 'Mechanical Keyboard', 75, 2499.00, 1),
  (3, 'USB-C Charger', 150, 1199.00, 1),
  (4, 'Laptop Stand', 60, 1599.00, 1),
  (5, 'Noise Cancelling Headphones', 40, 6999.00, 1),
  (6, 'Webcam HD', 55, 3299.00, 1),
  (7, 'Portable SSD 1TB', 35, 8499.00, 1),
  (8, 'Smartphone Tripod', 90, 999.00, 1),
  (9, 'Gaming Monitor 24 Inch', 25, 12499.00, 1),
  (10, 'Bluetooth Speaker', 80, 2199.00, 1);

INSERT INTO orders (order_id, user_id, prod_id, quantity, status, "createdAt", "updatedAt") VALUES
  (1, 1, 1, 2, 'completed', '2026-03-01', '2026-03-01'),
  (2, 2, 2, 1, 'completed', '2026-03-02', '2026-03-02'),
  (3, 3, 3, 3, 'pending', '2026-03-03', '2026-03-03'),
  (4, 4, 4, 1, 'completed', '2026-03-04', '2026-03-04'),
  (5, 5, 5, 1, 'failed', '2026-03-05', '2026-03-05'),
  (6, 6, 6, 2, 'completed', '2026-03-06', '2026-03-06'),
  (7, 7, 7, 1, 'pending', '2026-03-07', '2026-03-07'),
  (8, 8, 8, 4, 'completed', '2026-03-08', '2026-03-08'),
  (9, 9, 9, 1, 'completed', '2026-03-09', '2026-03-09'),
  (10, 10, 10, 2, 'pending', '2026-03-10', '2026-03-10');

INSERT INTO payments (payment_id, order_id, status, amount, transaction_id) VALUES
  (1, 1, 'completed', 1598.00, 'TXN-20260301-1001'),
  (2, 2, 'completed', 2499.00, 'TXN-20260302-1002'),
  (3, 3, 'pending', 3597.00, 'TXN-20260303-1003'),
  (4, 4, 'completed', 1599.00, 'TXN-20260304-1004'),
  (5, 5, 'failed', 6999.00, 'TXN-20260305-1005'),
  (6, 6, 'completed', 6598.00, 'TXN-20260306-1006'),
  (7, 7, 'pending', 8499.00, 'TXN-20260307-1007'),
  (8, 8, 'completed', 3996.00, 'TXN-20260308-1008'),
  (9, 9, 'completed', 12499.00, 'TXN-20260309-1009'),
  (10, 10, 'pending', 4398.00, 'TXN-20260310-1010');

SELECT setval(pg_get_serial_sequence('users', 'user_id'), COALESCE((SELECT MAX(user_id) FROM users), 1), true);
SELECT setval(pg_get_serial_sequence('products', 'prod_id'), COALESCE((SELECT MAX(prod_id) FROM products), 1), true);
SELECT setval(pg_get_serial_sequence('orders', 'order_id'), COALESCE((SELECT MAX(order_id) FROM orders), 1), true);
SELECT setval(pg_get_serial_sequence('payments', 'payment_id'), COALESCE((SELECT MAX(payment_id) FROM payments), 1), true);

COMMIT;
