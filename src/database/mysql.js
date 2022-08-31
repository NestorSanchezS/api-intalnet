const dotenv = require("dotenv");
dotenv.config();


class MySql {
    constructor() {
        this.db = mysql.createconnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            dateStrings: true
        });

        this.db.connect( err => {
            if (err) {
                console.log('Error en la conexión de la base de datos', err);
                return;
            }
            console.log('Base de datos conectada correctamente');
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

db = Singleton().instance()

module.exports = db
