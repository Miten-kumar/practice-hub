import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import csrf from "csurf";
import xss from "xss";
import * as crypto from "crypto";
import * as http from "http";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Security Headers
app.use(helmet());

// ✅ Strong session config
app.use(
  session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in HTTPS
      sameSite: "strict",
    },
  })
);

// ✅ Rate limiting (prevents brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ✅ CSRF Protection
const csrfProtection = csrf();

// In-memory DB
type User = {
  id: number;
  username: string;
  password: string;
  role: "user" | "admin";
};

let users: User[] = [];

// 🔐 Middleware: Auth check
function isAuthenticated(req: any, res: any, next: any) {
  if (!req.session.user) return res.status(401).send("Unauthorized");
  next();
}

// 🔐 Middleware: Admin check
function isAdmin(req: any, res: any, next: any) {
  if (req.session.user.role !== "admin")
    return res.status(403).send("Forbidden");
  next();
}

// ✅ FIX A1: Proper Access Control
app.get("/admin", isAuthenticated, isAdmin, (req:any, res:any) => {
  res.send("Welcome Admin!");
});

// ✅ FIX A2: Hash passwords
app.post("/register", async (req: any, res: any) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    id: users.length + 1,
    username,
    password: hashed,
    role: "user",
  });

  res.send("User registered");
});

// ✅ FIX A3: Prevent Injection (strict comparison only)
app.get("/user", (req: any, res: any) => {
  const query = String(req.query.q || "");

  const result = users.filter((u) => u.username === query);
  res.json(result);
});

// ✅ FIX A4: Rate limiting already added
app.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.send("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Invalid credentials");

  req.session.user = user;
  res.send("Logged in");
});

// ✅ FIX A5: Remove debug endpoint
// (deleted)

// ✅ FIX A6: Remove eval
// (deleted completely)

// ✅ FIX A7: Secure session usage
app.get("/profile", isAuthenticated, (req: any, res: any) => {
  res.send({
    id: req.session.user.id,
    username: req.session.user.username,
    role: req.session.user.role,
  });
});

// ✅ FIX A8: Validate role changes
app.post("/update-role", isAuthenticated, isAdmin, (req: any, res: any) => {
  const { username, role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).send("Invalid role");
  }

  const user = users.find((u) => u.username === username);
  if (user) {
    user.role = role;
  }

  res.send("Role updated");
});

// ✅ FIX A9: Add logging
app.get("/transfer", isAuthenticated, (req: any, res: any) => {
  const { amount } = req.query;

  console.log("TRANSFER:", {
    user: req.session.user.username,
    amount,
    time: new Date(),
  });

  res.send(`Transferred ${amount}`);
});

// ✅ FIX A10: Prevent SSRF
app.get("/fetch", (req: any, res: any) => {
  const url = req.query.url;

  // allow only safe domains
  if (!url.startsWith("http://example.com")) {
    return res.status(400).send("Invalid URL");
  }

  http.get(url, (response: any) => {
    let data = "";
    response.on("data", (chunk: any) => (data += chunk));
    response.on("end", () => res.send(data));
  });
});

// ✅ FIX XSS
app.get("/search", (req: any, res: any) => {
  const q = xss(req.query.q || "");
  res.send(`<h1>Results for ${q}</h1>`);
});

// ✅ FIX CSRF
app.post(
  "/change-password",
  isAuthenticated,
  csrfProtection,
  async (req: any, res: any) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    req.session.user.password = hashed;
    res.send("Password changed");
  }
);

app.listen(3000, () => console.log("Secure app running on port 3000"));