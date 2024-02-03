import mysql from "serverless-mysql";


export const conn = mysql({
  config: {
    host: "localhost",
    user: "master",
    password: "password",
    port: 3306,
    database: "next_example"
  },
});

/*
import mysql from "mysql";

export const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tasksdb",
  insecureAuth: true,
});
*/