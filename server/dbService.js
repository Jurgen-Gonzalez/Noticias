const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('DB is connected');
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    // async insertNews(titulo) {
    async insertNews(titulo, contenido, idpersonal) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = `INSERT INTO nota (titulo, contenido, idpersonal)
                                VALUES (?,?,?);`;

                connection.query(query, [titulo, contenido, idpersonal],
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result.insertId);
                    })
            });
            return {
                idnota: insertId,
                titulo: titulo,
                contenido: contenido,
                idpersonal: idpersonal,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getAllNews() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM nota;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getComments(idnota) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM comentario WHERE idnota = ?;";

                connection.query(query, [idnota], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(idusuario) {
        try {
            const usuarioSelect = ` IN (SELECT idusuario FROM usuario 
                                    WHERE idusuario = ?);`;
            let response = await new Promise((resolve, reject) => {
                const query = `SELECT nombre FROM cliente WHERE idusuario 
                                ${usuarioSelect}`;

                connection.query(query, [idusuario], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            if (response.length === 0) {
                response = await new Promise((resolve, reject) => {
                    const query = `SELECT nombre FROM personal WHERE idusuario 
                    ${usuarioSelect}`;

                    connection.query(query, [idusuario], (err, results) => {
                        if (err) reject(new Error(err.message));
                        resolve(results);
                    })
                });

                return response;
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getPersonnel() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT idpersonal, nombre FROM personal LIMIT 1;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async searchByComment(contenido) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM comentario WHERE contenido LIKE '%${contenido}%';`;

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async searchByResponse(contenido) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM respuesta WHERE contenido LIKE '%${contenido}%';`;

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;