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
  pgm.db.query({
    text: `
    INSERT INTO users (id, name, email, contact_no, created_at) VALUES
(1,'Amit Sharma','amit1@mail.com','9000000001','2025-01-01'),
(2,'Priya Verma','priya2@mail.com','9000000002','2025-01-02'),
(3,'Rahul Mehta','rahul3@mail.com','9000000003','2025-01-03'),
(4,'Sneha Iyer','sneha4@mail.com','9000000004','2025-01-04'),
(5,'Arjun Singh','arjun5@mail.com','9000000005','2025-01-05'),
(6,'Neha Kapoor','neha6@mail.com','9000000006','2025-01-06'),
(7,'Vikram Rao','vikram7@mail.com','9000000007','2025-01-07'),
(8,'Ananya Das','ananya8@mail.com','9000000008','2025-01-08'),
(9,'Rohit Jain','rohit9@mail.com','9000000009','2025-01-09'),
(10,'Kavya Nair','kavya10@mail.com','9000000010','2025-01-10'),
(11,'Manish Gupta','manish11@mail.com','9000000011','2025-01-11'),
(12,'Pooja Reddy','pooja12@mail.com','9000000012','2025-01-12'),
(13,'Karan Malhotra','karan13@mail.com','9000000013','2025-01-13'),
(14,'Divya Bansal','divya14@mail.com','9000000014','2025-01-14'),
(15,'Nikhil Joshi','nikhil15@mail.com','9000000015','2025-01-15'),
(16,'Aisha Khan','aisha16@mail.com','9000000016','2025-01-16'),
(17,'Siddharth Roy','sid17@mail.com','9000000017','2025-01-17'),
(18,'Meera Pillai','meera18@mail.com','9000000018','2025-01-18'),
(19,'Harsh Vardhan','harsh19@mail.com','9000000019','2025-01-19'),
(20,'Isha Arora','isha20@mail.com','9000000020','2025-01-20'),
(21,'Deepak Yadav','deepak21@mail.com','9000000021','2025-01-21'),
(22,'Ritika Shah','ritika22@mail.com','9000000022','2025-01-22'),
(23,'Varun Patel','varun23@mail.com','9000000023','2025-01-23'),
(24,'Tanya Chawla','tanya24@mail.com','9000000024','2025-01-24'),
(25,'Aditya Rao','aditya25@mail.com','9000000025','2025-01-25'),
(26,'Simran Kaur','simran26@mail.com','9000000026','2025-01-26'),
(27,'Gaurav Sinha','gaurav27@mail.com','9000000027','2025-01-27'),
(28,'Shruti Menon','shruti28@mail.com','9000000028','2025-01-28'),
(29,'Yash Thakur','yash29@mail.com','9000000029','2025-01-29'),
(30,'Ankit Tiwari','ankit30@mail.com','9000000030','2025-01-30'),
(31,'Nisha Arjun','nisha31@mail.com','9000000031','2025-01-31'),
(32,'Ramesh Iyer','ramesh32@mail.com','9000000032','2025-02-01'),
(33,'Komal Shah','komal33@mail.com','9000000033','2025-02-02'),
(34,'Tarun Gupta','tarun34@mail.com','9000000034','2025-02-03'),
(35,'Saloni Jain','saloni35@mail.com','9000000035','2025-02-04'),
(36,'Abhishek Roy','abhishek36@mail.com','9000000036','2025-02-05'),
(37,'Riya Kapoor','riya37@mail.com','9000000037','2025-02-06'),
(38,'Vishal Mehra','vishal38@mail.com','9000000038','2025-02-07'),
(39,'Preeti Singh','preeti39@mail.com','9000000039','2025-02-08'),
(40,'Kunal Das','kunal40@mail.com','9000000040','2025-02-09'),
(41,'Anjali Rao','anjali41@mail.com','9000000041','2025-02-10'),
(42,'Mohit Verma','mohit42@mail.com','9000000042','2025-02-11'),
(43,'Sonal Arora','sonal43@mail.com','9000000043','2025-02-12'),
(44,'Rajat Malhotra','rajat44@mail.com','9000000044','2025-02-13'),
(45,'Pallavi Singh','pallavi45@mail.com','9000000045','2025-02-14'),
(46,'Akash Kumar','akash46@mail.com','9000000046','2025-02-15'),
(47,'Neeraj Patel','neeraj47@mail.com','9000000047','2025-02-16'),
(48,'Bhavna Shah','bhavna48@mail.com','9000000048','2025-02-17'),
(49,'Rohini Das','rohini49@mail.com','9000000049','2025-02-18'),
(50,'Sagar Nair','sagar50@mail.com','9000000050','2025-02-19');


    `,
  });
  pgm.db.query({
    text: `
    INSERT INTO products (product_id, name, description, price) VALUES
(1,'Wireless Mouse','Ergonomic wireless mouse',799),
(2,'Mechanical Keyboard','RGB mechanical keyboard',3499),
(3,'Bluetooth Headphones','Noise cancelling headphones',2999),
(4,'USB-C Charger','Fast charging adapter',999),
(5,'Gaming Laptop','High performance laptop',85000),
(6,'Smartphone','5G Android smartphone',25000),
(7,'Smartwatch','Fitness tracking watch',5999),
(8,'Office Chair','Ergonomic chair',7000),
(9,'LED Monitor','24 inch FHD monitor',12000),
(10,'External HDD','1TB external hard drive',4500),
(11,'Tablet','10 inch Android tablet',15000),
(12,'Power Bank','20000mAh power bank',1500),
(13,'Webcam','HD webcam',1800),
(14,'Microphone','USB condenser mic',3500),
(15,'Printer','Wireless printer',9000),
(16,'Router','Dual band router',2500),
(17,'Graphic Tablet','Drawing tablet',4000),
(18,'SSD','500GB SSD',5500),
(19,'RAM 16GB','DDR4 RAM',4200),
(20,'Gaming Mousepad','Extended mousepad',600),
(21,'Keyboard Cover','Silicone cover',300),
(22,'Laptop Stand','Adjustable stand',1200),
(23,'Desk Lamp','LED desk lamp',900),
(24,'Cooling Pad','Laptop cooling pad',1100),
(25,'VR Headset','Virtual reality headset',22000),
(26,'Drone','Camera drone',45000),
(27,'Action Camera','4K action cam',15000),
(28,'Smart TV','50 inch 4K TV',55000),
(29,'Speakers','Bluetooth speakers',3500),
(30,'Fitness Band','Activity tracker',2500),
(31,'Mouse Bungee','Gaming accessory',700),
(32,'Surge Protector','6 plug extension',800),
(33,'Ethernet Cable','5m LAN cable',400),
(34,'HDMI Cable','2m HDMI cable',500),
(35,'Laptop Bag','Waterproof backpack',2000),
(36,'Portable Monitor','15 inch portable monitor',18000),
(37,'NAS Storage','2 bay NAS',30000),
(38,'Graphics Card','Mid range GPU',40000),
(39,'CPU Cooler','Liquid cooler',6000),
(40,'Smart Bulb','WiFi smart bulb',1500),
(41,'Tripod','Camera tripod',2500),
(42,'Green Screen','Studio backdrop',3500),
(43,'Drawing Stylus','Digital pen',1800),
(44,'Projector','Home theater projector',45000),
(45,'Wireless Earbuds','True wireless earbuds',3500),
(46,'Monitor Arm','Adjustable arm',2500),
(47,'Laptop Sleeve','Protective sleeve',800),
(48,'Phone Case','Shockproof case',500),
(49,'Screen Protector','Tempered glass',300),
(50,'Memory Card','128GB SD card',1200);

    `,
  });

  pgm.db.query({
    text: `INSERT INTO orders (order_id,user_id,product_id,quantity,unit_price,created_at) VALUES
(1,1,1,2,799,'2025-03-01'),
(2,1,2,1,3499,'2025-03-15'),
(3,2,3,1,2999,'2025-03-02'),
(4,2,1,1,799,'2025-04-01'),
(5,3,5,1,85000,'2025-03-10'),
(6,4,6,2,25000,'2025-03-12'),
(7,5,7,1,5999,'2025-03-18'),
(8,5,3,2,2999,'2025-04-05'),
(9,6,10,1,4500,'2025-04-10'),
(10,7,8,1,7000,'2025-04-15'),
(11,8,9,2,12000,'2025-05-01'),
(12,9,4,3,999,'2025-05-05'),
(13,10,12,2,1500,'2025-05-08'),
(14,1,3,1,2999,'2025-05-10'),
(15,2,6,1,25000,'2025-05-12'),
(16,3,18,2,5500,'2025-05-15'),
(17,4,20,5,600,'2025-05-18'),
(18,6,2,1,3499,'2025-05-20'),
(19,7,11,1,15000,'2025-05-25'),
(20,8,15,1,9000,'2025-05-28'),
(21,9,5,1,85000,'2025-06-01'),
(22,10,6,1,25000,'2025-06-03'),
(23,11,1,1,799,'2025-06-05'),
(24,12,7,2,5999,'2025-06-08'),
(25,13,9,1,12000,'2025-06-10'),
(26,14,30,1,2500,'2025-06-12'),
(27,15,25,1,22000,'2025-06-15'),
(28,16,26,1,45000,'2025-06-18'),
(29,17,29,2,3500,'2025-06-20'),
(30,18,35,1,2000,'2025-06-22'),
(31,19,40,2,1500,'2025-06-25'),
(32,20,45,1,3500,'2025-06-28'),
(33,21,48,3,500,'2025-07-01'),
(34,22,49,2,300,'2025-07-02'),
(35,23,50,1,1200,'2025-07-03'),
(36,24,16,1,2500,'2025-07-04'),
(37,25,17,1,4000,'2025-07-05'),
(38,26,22,1,1200,'2025-07-06'),
(39,27,24,2,1100,'2025-07-07'),
(40,28,27,1,15000,'2025-07-08'),
(41,29,28,1,55000,'2025-07-09'),
(42,30,31,1,700,'2025-07-10'),
(43,1,1,1,799,'2025-07-12'),
(44,2,2,1,3499,'2025-07-13'),
(45,3,3,2,2999,'2025-07-14'),
(46,4,4,1,999,'2025-07-15'),
(47,5,5,1,85000,'2025-07-16'),
(48,6,6,1,25000,'2025-07-17'),
(49,7,7,1,5999,'2025-07-18'),
(50,8,8,1,7000,'2025-07-19');

`,
  });
  pgm.db.query({
    text: `INSERT INTO reviews (review_id,user_id,product_id,rating,comment,created_at) VALUES
(1,1,1,5,'Excellent mouse','2025-03-05'),
(2,2,1,4,'Good quality','2025-04-02'),
(3,3,5,5,'Amazing laptop','2025-03-15'),
(4,4,6,4,'Worth the price','2025-03-20'),
(5,5,7,5,'Loved the watch','2025-03-22'),
(6,6,10,3,'Average HDD','2025-04-15'),
(7,7,8,4,'Comfortable chair','2025-04-18'),
(8,8,9,5,'Great display','2025-05-02'),
(9,9,4,3,'Okay charger','2025-05-07'),
(10,10,12,4,'Useful power bank','2025-05-10'),
(11,11,1,5,'Nice product','2025-06-06'),
(12,12,7,4,'Works well','2025-06-09'),
(13,13,9,5,'Fantastic monitor','2025-06-12'),
(14,14,30,3,'Good band','2025-06-14'),
(15,15,25,5,'VR is awesome','2025-06-18'),
(16,16,26,4,'Drone is stable','2025-06-20'),
(17,17,29,4,'Clear sound','2025-06-23'),
(18,18,35,5,'Nice bag','2025-06-25'),
(19,19,40,4,'Smart bulb works','2025-06-28'),
(20,20,45,5,'Earbuds are great','2025-07-01'),
(21,1,3,4,'Good headphones','2025-05-12'),
(22,2,6,5,'Excellent phone','2025-05-14'),
(23,3,18,4,'Fast SSD','2025-05-17'),
(24,4,20,3,'Decent pad','2025-05-20'),
(25,5,3,5,'Nice sound','2025-04-07'),
(26,6,2,4,'Keyboard solid','2025-05-22'),
(27,7,11,3,'Tablet okay','2025-05-27'),
(28,8,15,4,'Printer good','2025-05-30'),
(29,9,5,5,'High performance','2025-06-03'),
(30,10,6,4,'Smooth phone','2025-06-05'),
(31,21,48,4,'Good case','2025-07-02'),
(32,22,49,3,'Basic protector','2025-07-03'),
(33,23,50,5,'Fast card','2025-07-04'),
(34,24,16,4,'Router stable','2025-07-05'),
(35,25,17,5,'Tablet great','2025-07-06'),
(36,26,22,4,'Useful stand','2025-07-07'),
(37,27,24,3,'Cooling average','2025-07-08'),
(38,28,27,5,'Action cam superb','2025-07-09'),
(39,29,28,4,'TV good quality','2025-07-10'),
(40,30,31,3,'Bungee okay','2025-07-11'),
(41,31,1,4,'Looks good','2025-07-12'),  -- reviewed without purchase
(42,32,2,5,'Nice RGB','2025-07-13'),
(43,33,3,4,'Good bass','2025-07-14'),
(44,34,4,2,'Not durable','2025-07-15'),
(45,35,5,5,'Excellent','2025-07-16'),
(46,36,6,4,'Satisfied','2025-07-17'),
(47,37,7,5,'Very nice','2025-07-18'),
(48,38,8,4,'Comfortable','2025-07-19'),
(49,39,9,5,'Sharp display','2025-07-20'),
(50,40,10,3,'Works fine','2025-07-21');

`,
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.db.query({
    text: "Truncate table users cascade",
  });
  pgm.db.query({
    text: "Truncate table products cascade",
  });
  pgm.db.query({
    text: "Truncate table reviews cascade",
  });
  pgm.db.query({
    text: "Truncate table orders cascade",
  });

};
