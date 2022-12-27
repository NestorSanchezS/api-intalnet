const mysql = require("mysql2")
const dotenv = require("dotenv");
dotenv.config();


class MySql {
    connect() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            dateStrings: true
        });

        this.db.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
                this.connect()
            } else {
                throw err;
            }
        });

        return new Promise((resolve, reject) => {
            this.db.connect( err => {
                if (err) return reject(`ERROR: database ${err}`);
                resolve()
            })
        })
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
