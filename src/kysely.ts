import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";

export const db = new Kysely<object>({
  dialect: new SqliteDialect({
    database: new Database("./data/database.db"),
  }),
});
