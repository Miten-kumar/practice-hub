import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import dns from "dns/promises";
import { AppDataSource } from "./data-source";
import { User } from "../src/entity/user";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

const sessions = new Map<string, number>(); // sessionId -> userId
const csrfTokens = new Map<string, string>(); // sessionId -> csrf token

async function isSafeURL(input: string) {
  const url = new URL(input);

  const allowedDomains = ["jsonplaceholder.typicode.com"];

  if (!allowedDomains.includes(url.hostname)) {
    return false;
  }

  const { address } = await dns.lookup(url.hostname);

  if (
    address.startsWith("127.") ||
    address.startsWith("10.") ||
    address.startsWith("192.168.") ||
    address.startsWith("169.254.")
  ) {
    return false;
  }

  return true;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

AppDataSource.initialize().then(async () => {
  console.log("connection sucessfull")
  const repo = AppDataSource.getRepository(User);

  // Seed user (hashed password)
  const hashed = await bcrypt.hash("1234", 10);

  const user = repo.create({
    username: "admin",
    password: hashed,
    role: "admin",
  });

  await repo.save(user);

  // SQL Injection FIX
  app.get("/user", async (req, res) => {
    const id = Number(req.query.id);

    if (!id) {
      return res.status(400).send("Invalid ID");
    }

    const user = await repo.findOne({ where: { id } });

    res.json(user);
  });

  //  Secure Login
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await repo.findOne({ where: { username } });

    if (!user) return res.status(401).send("Invalid");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send("Invalid");

    const sessionId = crypto.randomBytes(32).toString("hex");

    sessions.set(sessionId, user.id);

    const csrfToken = crypto.randomBytes(24).toString("hex");
    csrfTokens.set(sessionId, csrfToken);

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ csrfToken });
  });

  // XSS FIX
  app.get("/search", (req, res) => {
    const q = escapeHtml(String(req.query.q || ""));
    res.send(`<h1>Search: ${q}</h1>`);
  });

  // Middleware: Auth + CSRF
  function authMiddleware(req: any, res: any, next: any) {
    const sessionId = req.cookies.session;

    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).send("Unauthorized");
    }

    req.userId = sessions.get(sessionId);
    req.sessionId = sessionId;

    next();
  }

  function csrfMiddleware(req: any, res: any, next: any) {
    const token = req.headers["x-csrf-token"];

    if (!token || token !== csrfTokens.get(req.sessionId)) {
      return res.status(403).send("CSRF blocked");
    }

    next();
  }

  //  CSRF Protected Route
  app.post("/transfer", authMiddleware, csrfMiddleware, (req, res) => {
    const { amount } = req.body;
    res.send(`Transferred ${amount}`);
  });

  // SSRF FIX
  app.get("/fetch", async (req, res) => {
    const url = req.query.url as string;

    try {
      const safe = await isSafeURL(url);

      if (!safe) {
        return res.status(400).send("Invalid URL");
      }

      const response = await fetch(url, {
        redirect: "manual",
      });

      res.send(await response.text());
    } catch {
      res.status(400).send("Error");
    }
  });

  //  Remove sensitive debug OR sanitize
  app.get("/debug", (req, res) => {
    res.json({
      message: "Debug disabled in production",
    });
  });

  app.listen(3000, () => {
    console.log("Secure server running on port 3000");
  });
});