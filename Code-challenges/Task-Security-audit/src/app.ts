import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { User } from "../src/entity/user";
import "reflect-metadata"

const app = express();
app.use(bodyParser.json());

AppDataSource.initialize().then(async () => {
  console.log("connection sucessfull")
  const repo = AppDataSource.getRepository(User);

  const user = repo.create({
    username: "admin",
    password: "1234", //expose password
    role: "admin",
  });
  await repo.save(user);

  app.get("/user", async (req, res) => {
    const id = req.query.id;

    const result = await repo.query(
      `SELECT * FROM "user" WHERE id = ${id}`
    );

    res.json(result);
  });

  //  Login (SQLi + Broken Auth)
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await repo.query(
      `SELECT * FROM "user" WHERE username = '${username}' AND password = '${password}'`
    );

    if (result.length > 0) {
      res.cookie("session", result[0].id); //insecure session
      res.send("Logged in");
    } else {
      res.status(401).send("Invalid");
    }
  });

  //XSS
  app.get("/search", (req, res) => {
    const q = req.query.q;
    res.send(`<h1>Search: ${q}</h1>`); // no escaping
  });

  // CSRF
  app.post("/transfer", (req, res) => {
    const { amount } = req.body;

    // assume authenticated via cookie
    res.send(`Transferred ${amount}`);
  });

  // SSRF
  app.get("/fetch", async (req, res) => {
    const url = req.query.url as string;

    const response = await fetch(url);
    const data = await response.text();

    res.send(data);
  });

  // Sensitive Data Exposure
  app.get("/debug", (req, res) => {
    res.json({
      headers: req.headers,
      cookies: req.cookies,
    });
  });

  //  No security headers

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});