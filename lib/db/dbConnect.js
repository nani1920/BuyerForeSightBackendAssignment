/** @format */
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "prospect_leads.db");
let db = null;
const dbConnect = async (req, res) => {
  try {
    db = await open({
      driver: sqlite3.Database,
      filename: dbPath,
    });
    // const query = `create table prospects (id integer primary key autoincrement,

    //     name text not null,

    //     email text not null unique,

    //     phone text not null,

    //     company text not null,

    //     created_at datetime default current_timestamp,

    //     updated_at datetime default current_timestamp
    //     )`;

    // const res = await db.run(query);
    // console.log(res);
    console.log("Db Connected Successfully");
  } catch (e) {
    console.log("DB Connection Error", e.message);
  }
};

const getDb = () => db;
module.exports = { dbConnect, getDb };
