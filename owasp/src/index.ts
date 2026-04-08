const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// const crypto = require("crypto");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// ❌ Weak session config (Broken Authentication)
app.use(
  session({
    secret: "123", // weak secret
    resave: true,
    saveUninitialized: true,
  }),
);

// In-memory "DB"
let users = [{ id: 1, username: "admin", password: "admin123", role: "admin" }];

// ❌ A1: Broken Access Control
app.get("/admin", (req: any, res: any) => {
  if (req.query.isAdmin === "true") {
    res.send("Welcome Admin!");
  } else {
    res.send("Access Denied");
  }
});

// ❌ A2: Cryptographic Failures
app.post("/register", (req: any, res: any) => {
  const { username, password } = req.body;

  // storing plain password
  users.push({ id: users.length + 1, username, password, role: "user" });

  res.send("User registered");
});

// ❌ A3: Injection (SQL-like simulation)
app.get("/user", (req: any, res: any) => {
  const query = req.query.q;

  // Simulating SQL injection
  const result = users.filter(
    (u) => u.username === query || query.includes("OR 1=1"),
  );

  res.json(result);
});

// ❌ A4: Insecure Design (no rate limiting)
app.post("/login", (req: any, res: any) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    req.session.user = user;
    res.send("Logged in");
  } else {
    res.send("Invalid credentials");
  }
});

// ❌ A5: Security Misconfiguration
app.get("/debug", (req: any, res: any) => {
  res.send({
    env: process.env,
    users,
  });
});

// ❌ A6: Vulnerable Components (simulated outdated lib usage)
const outdatedLib = {
  evalCode: (input: any) => eval(input), // dangerous
};

app.get("/eval", (req: any, res: any) => {
  const result = outdatedLib.evalCode(req.query.code);
  res.send(result);
});

// ❌ A7: Identification & Authentication Failures
app.get("/profile", (req: any, res: any) => {
  if (!req.session.user) {
    return res.send("Not logged in");
  }

  res.send(req.session.user);
});

// ❌ A8: Software & Data Integrity Failures
app.post("/update-role", (req: any, res: any) => {
  const { username, role } = req.body;

  const user = users.find((u) => u.username === username);
  if (user) {
    user.role = role; // no validation
  }

  res.send("Role updated");
});

// ❌ A9: Logging & Monitoring Failures
app.get("/transfer", (req: any, res: any) => {
  const { amount } = req.query;

  // no logging of sensitive action
  res.send(`Transferred ${amount}`);
});

// ❌ A10: Server-Side Request Forgery (SSRF)
const http = require("http");

app.get("/fetch", (req: any, res: any) => {
  const url = req.query.url;

  http.get(url, (response: any) => {
    let data = "";
    response.on("data", (chunk: any) => (data += chunk));
    response.on("end", () => res.send(data));
  });
});

// ❌ XSS
app.get("/search", (req: any, res: any) => {
  const q = req.query.q;
  res.send(`<h1>Results for ${q}</h1>`); // no sanitization
});

// ❌ CSRF (no protection)
app.post("/change-password", (req: any, res: any) => {
  if (!req.session.user) return res.send("Login first");

  req.session.user.password = req.body.password;
  res.send("Password changed");
});

app.listen(3000, () => console.log("App running on port 3000"));
