import { AppDataSource } from "./data-source";
import express from "express";
import app from "./app";
import { Server } from "node:http";
import { faker } from "@faker-js/faker";
import { Product } from "./entity/Products";

AppDataSource.initialize();

app.listen(3001, () => {
  console.log("server is running on port 3001");
});

// async function seedProducts() {
//   await AppDataSource.initialize();

//   const repo = AppDataSource.getRepository(Product);

//   const products: Product[] = [];

//   for (let i = 0; i < 1000; i++) {
//     const product = new Product();

//     product.title = faker.commerce.productName();
//     product.price = parseFloat(faker.commerce.price({ min: 100, max: 10000 }));
//     product.description = faker.commerce.productDescription();

//     // 🔥 Better than random junk URLs
//     product.image = `https://picsum.photos/300/300?random=${i}`;

//     // simulate realistic timestamps
//     product.createdAt = faker.date.past({ years: 1 });
//     product.updatedAt = new Date();

//     products.push(product);
//   }

//   await repo.save(products);

//   console.log("✅ 1000 Products Seeded");
//   process.exit();
// }

// seedProducts();

// app.listen(3001, () => {
//   console.log("server is running on port 3001");
// });

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
