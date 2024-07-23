class Employee {
    constructor(id, name, department, position, managerId = null) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.position = position;
        this.managerId = managerId;
    }

    updateInfo(name, department, position, managerId) {
        this.name = name;
        this.department = department;
        this.position = position;
        this.managerId = managerId;
    }

    toString() {
        return `ID: ${this.id}, Name: ${this.name}, Department: ${this.department}, Position: ${this.position}, Manager ID: ${this.managerId}`;
    }
}

class EmployeeManager {
    constructor() {
        this.employees = new Map();
    }

    addEmployee(employee) {
        if (this.employees.has(employee.id)) {
            console.log(`Employee with ID ${employee.id} already exists.`);
        } else {
            this.employees.set(employee.id, employee);
            console.log(`Employee ${employee.name} added.`);
        }
    }

    updateEmployee(id, name, department, position, managerId) {
        const employee = this.employees.get(id);
        if (employee) {
            employee.updateInfo(name, department, position, managerId);
            console.log(`Employee ${employee.name} updated.`);
        } else {
            console.log(`Employee with ID ${id} not found.`);
        }
    }

    deleteEmployee(id) {
        if (this.employees.delete(id)) {
            console.log(`Employee with ID ${id} deleted.`);
        } else {
            console.log(`Employee with ID ${id} not found.`);
        }
    }

    searchEmployee(criteria) {
        let results = [];
        this.employees.forEach(employee => {
            for (let key in criteria) {
                if (employee[key] && employee[key].includes(criteria[key])) {
                    results.push(employee);
                    break;
                }
            }
        });
        return results;
    }

    displayHierarchy() {
        let visited = new Set();
        let hierarchy = [];
        
        this.employees.forEach(employee => {
            if (!visited.has(employee.id)) {
                let path = this.buildHierarchy(employee.id, visited);
                if (path) hierarchy.push(path);
            }
        });

        return hierarchy;
    }

    buildHierarchy(id, visited) {
        if (visited.has(id)) {
            return null;
        }
        visited.add(id);
        let employee = this.employees.get(id);
        if (!employee) return null;
        const subordinates = [];
        this.employees.forEach(emp => {
            if (emp.managerId === id) {
                let subPath = this.buildHierarchy(emp.id, visited);
                if (subPath) subordinates.push(subPath);
            }
        });
        return { employee: employee.toString(), subordinates: subordinates };
    }
}
let manager = new EmployeeManager();
let emp1 = new Employee(1, 'Surya', 'Engineering', 'Engineer', null);
let emp2 = new Employee(2, 'Arthy', 'Engineering', 'Senior Engineer', 1);
let emp3 = new Employee(3, 'Prakash', 'HR', 'HR Manager', null);
manager.addEmployee(emp1);
manager.addEmployee(emp2);
manager.addEmployee(emp3);

console.log('Search Results:', manager.searchEmployee({ department: 'Engineering' }));
console.log('Hierarchy:', JSON.stringify(manager.displayHierarchy(), null, 2));
