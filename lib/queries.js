const db = require("../config/connection");

const viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM employee`;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            console.table(res);
            resolve();
        });
    });
};

module.exports = { viewAllEmployees };