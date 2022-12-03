const express = require('express');
const pg = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    "Access-Control-Allow-Origin": "*",
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT, () => {
    console.log(`server is running on port : ${process.env.PORT}`);
})

const pool = new pg.Pool({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "Video_Game_Distribution",
    max: 50,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
});

pool.connect((err) => {
    err ? console.log('connection error : ', err.stack) : console.log('connected db!');
});

// get all table details
app.get("/table/:tableName", (req, res) => {
    const tableName = req.params.tableName;
    pool.query(`SELECT * FROM "video_game_db"."${tableName}"`, (error, data) => {
        if (error) {
            res.json({
                err: true,
                data: error
            })
        } else {
            res.json({
                err: false,
                data: data
            })
        }
    })
})

// run specific query
app.post("/query", (req, res) => {
    console.log(req.body);
    const query = req.body.query;
    pool.query(query, (error, data) => {
        if (error) {
            res.json({
                err: true,
                data: error
            })
        } else {
            // console.log(data.rows);
            res.json({
                err: false,
                data: data
            })
        }
    })
})