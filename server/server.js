const jsonServer = require('json-server');

const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const employeesData = require('./data');

const employeeList = employeesData;

let employees = employeeList.getEmployees.employees
let lastIndex = employees[employees.length -1].id;

server.get('/getEmployees' , (req , res) => {
    res.send(employeesData.getEmployees);
});

server.post('/addEmployee' , (req , res) => {
    const employeeReceived = req.body;
    console.log(req.body);

    const employeeToAdd = {
        ...employeeReceived,
        id : lastIndex 
    };

    employees.push(employeeToAdd);
    ++lastIndex;
    res.send(true);
});

server.post('/deleteEmployee' , (req, res) => {

    const employeeForDelete = req.body;
    let indexOfDeleteEmployee =  employees.findIndex(employee => employee.id === employeeForDelete.id)

    employees.splice(indexOfDeleteEmployee , 1);
    res.send(true);
})


server.post('/updateEmployee' , (req , res) => {
    const employeeForUpdate = req.body;

     employees.forEach(employee => {
        if(employee.id === employeeForUpdate.id) {
            employee.name = employeeForUpdate.name;
            employee.phone = employeeForUpdate.phone;
            employee.address = employeeForUpdate.address;
            employee.email = employeeForUpdate.email;
        }
    })

    res.send(true);
})

server.listen(3000 , () => {
    console.log("Listening now");
})