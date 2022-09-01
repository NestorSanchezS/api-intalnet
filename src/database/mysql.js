const mysql = require("mysql2")
const dotenv = require("dotenv");
dotenv.config();


class MySql {
    constructor() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            dateStrings: true
        });

        this.db.connect( err => {
            if (err) {
                console.log('ERROR: on database connection', err);
                return;
            }
            console.log('database ready');
        });
    }

    execute(sql, args) {
        return new Promise((resolve, reject) => {
            this.db.query(sql, args, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.end( error => {
                if (error) return reject(error);
                resolve();
            });
        })
    }
}


class Singleton {
    constructor() {
        if (!Singleton.instance ) {
            Singleton.instance = new MySql();
        }
    }

    instance() {
        return Singleton.instance;
    }
}

const db = new Singleton().instance()

module.exports = db
