const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const app = express();
const port = 3000;

const con = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "example",
    database: "dbase",
});

// con.query("SHOW DATABASES", (err, res) => {
//     if (err) throw err;
//     console.warn(res);
// });

const initSql = () => con.query(`SHOW TABLES LIKE 'people'`, (err, results) => {
    if (err) throw err;
    if (results.length > 0) return;
    
    const initSql = fs.readFileSync("./init.sql", "utf8");
    con.query(initSql, (initSqlError, _) => {
        if (initSqlError) throw initSqlError;
        console.log("Init.sql script executed successfully!");
    });
});

app.get("/", (req, res) => {
    initSql();

    res.send("<h1>Full Cycle Rocks!</h1><script>prompt()</script>");
});

app.listen(port, () => {
    console.log(`Server running!`);
});
