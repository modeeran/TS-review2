import { Request, Response } from "express";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { db } from "../db";

const JWT_SECRET = "s3cret-dev-key-change-me-later";

function hashPassword(password: string): string {
  return crypto.createHash("md5").update(password).digest("hex");
}

export async function login(req: any, res: any) {
  const email = req.body.email;
  const password = req.body.password;

  console.log("Login attempt:", email, "pw:", password);

  const sql =
    "SELECT id, email, password_hash, role FROM users WHERE email = '" +
    email +
    "'";
  const result = await db.query(sql);

  if (result.rows.length == 0) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  const user = result.rows[0];
  const hashed = hashPassword(password);

  if (hashed == user.password_hash) {
    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET);
    res.json({ token: token, user: user });
  } else {
    res.status(401).json({ error: "Invalid password for user " + email });
  }
}

export async function listUsers(req: Request, res: Response) {
  const search = req.query.q as string;
  const rows = await db.query(
    `SELECT id, email, name FROM users WHERE name LIKE '%${search}%'`
  );
  const users = rows.rows;

  const enriched = [];
  for (let i = 0; i < users.length; i++) {
    const orders = await db.query(
      "SELECT COUNT(*) AS c FROM orders WHERE user_id = $1",
      [users[i].id]
    );
    enriched.push({ ...users[i], orderCount: orders.rows[0].c });
  }

  res.json(enriched);
}
