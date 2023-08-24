const db = require("../config/connection");

const viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary
        FROM employee, role, department
        WHERE department.id = role.department_id
        AND role.id = employee.role_id
        ORDER BY employee.id`;
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

const viewAllDepartments = () => {
    return new Promise ((resolve, reject) => {
        let sql = `SELECT department.id, department.name AS department FROM department`
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

const viewAllRoles = () => {
    return new Promise((resolve, reject) => {
        let sql =`SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`
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


module.exports = { viewAllEmployees, viewAllDepartments, viewAllRoles };