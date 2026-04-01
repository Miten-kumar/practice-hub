import { Request, Response } from "express";
import {
  createSession,
  getSessionFromRequest,
  setSessionCookie,
} from "../services/session.service";
import {
  getAllUsers,
  getDemoUser,
  searchUsers,
} from "../services/user.service";
import { escapeHtml } from "../utils/html";
import { renderPage } from "../utils/page";

export async function home(req: Request, res: Response) {
  const users = await getAllUsers();
  const demoUser = await getDemoUser();
  let session = getSessionFromRequest(req.headers.cookie);

  if (!session) {
    const sessionId = createSession(1);
    setSessionCookie(res, sessionId);
    session = getSessionFromRequest(`sid=${sessionId}`);
  }

  const list = users
    .map(
      (user) =>
        `<li>${escapeHtml(user.firstName)} ${escapeHtml(user.lastName)} (${escapeHtml(user.email)})</li>`,
    )
    .join("");

  res.send(
    renderPage(
      "Security Audit Demo",
      `<h1>Security Audit Demo</h1>
            <p>This app only includes the security items asked in the task: SQL injection, XSS, CSRF, and security headers.</p>
            <ul>
              <li><a href="/search">User search</a></li>
            </ul>
            <div class="card">
              <h2>Seeded users</h2>
              <ul>${list}</ul>
            </div>
            <div class="card">
              <h2>XSS and CSRF Demo</h2>
              <p>The comment below is stored in the database and escaped before rendering.</p>
              <p><strong>Saved comment:</strong> ${escapeHtml(demoUser?.bio || "No comment yet")}</p>
              <form method="post" action="/comment">
                <input type="hidden" name="csrfToken" value="${escapeHtml(session?.csrfToken || "")}" />
                <label for="comment">Comment</label>
                <textarea id="comment" name="comment" rows="4" maxlength="300"></textarea>
                <button type="submit">Save comment</button>
              </form>
            </div>`,
    ),
  );
}

export async function search(req: Request, res: Response) {
  const { searchTerm, users } = await searchUsers(req.query.q);
  const resultItems = users
    .map(
      (user) =>
        `<li>${escapeHtml(user.firstName)} ${escapeHtml(user.lastName)} - ${escapeHtml(user.email)}</li>`,
    )
    .join("");

  res.send(
    renderPage(
      "Search users",
      `<h1>User Search</h1>
            <p>Search is parameterized through TypeORM instead of string-built SQL.</p>
            <form method="get" action="/search">
              <label for="q">Name or email</label>
              <input id="q" name="q" value="${escapeHtml(searchTerm)}" maxlength="50" />
              <button type="submit">Search</button>
            </form>
            ${searchTerm ? `<div class="card"><h2>Results for "${escapeHtml(searchTerm)}"</h2><ul>${resultItems || "<li>No matches</li>"}</ul></div>` : ""}`,
    ),
  );
}
