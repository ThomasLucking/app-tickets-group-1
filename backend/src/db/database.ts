import { Database } from "bun:sqlite";

export const db = new Database("./backend/src/data/mydb.sqlite");

db.run(`
  CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    emailVerified INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL REFERENCES user(id),
    token TEXT NOT NULL UNIQUE,
    expiresAt TEXT NOT NULL,
    ipAddress TEXT,
    userAgent TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL REFERENCES user(id),
    accountId TEXT NOT NULL,
    providerId TEXT NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    expiresAt TEXT,
    password TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS status (
    id_status INTEGER PRIMARY KEY AUTOINCREMENT,
    status_name VARCHAR(50) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ticket (
    id_ticket INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    level VARCHAR(30),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_status VARCHAR(30),
    id_user TEXT REFERENCES user(id),
    id_support TEXT DEFAULT NULL REFERENCES user(id)
  );

  CREATE TABLE IF NOT EXISTS ticket_assignment (
    id_assignment INTEGER PRIMARY KEY AUTOINCREMENT,
    id_ticket INTEGER NOT NULL REFERENCES ticket(id_ticket),
    id_support TEXT NOT NULL REFERENCES user(id),
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
  );
`);