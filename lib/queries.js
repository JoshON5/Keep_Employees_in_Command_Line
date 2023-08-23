const viewAllEmployees = () => {
    
        let data = `SELECT employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.department_name,
        role.salary
        FROM employee, role, department
        WHERE department.id - role.department.id
        AND role.id = employee.role_id
        ORDER BY employee.id`;
        db.promise().query(data, (err, response) =>{ if (err) throw err;
            console.log(response);
        promptChoices();
        })
}

module.exports = { viewAllEmployees }