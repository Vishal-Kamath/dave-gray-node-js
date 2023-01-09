import { eventLogger } from './../middleware/logEvents';
import { Request, Response } from 'express';
import {
  ReqEmployee,
  ReqEmployeeId,
  ReqEmployeeName,
} from '../schema/employee.schema';
import { employeesData, Employee } from '../model/employees';

const data = {
  employees: employeesData,
  setEmployees: function (data: Employee[]) {
    this.employees = data;
  },
};

// route '/'
// GET
export const getAllEmployees = (req: Request, res: Response) => {
  res.json(data.employees);
};

// POST
export const createNewEmployee = (
  req: Request<{}, {}, ReqEmployeeName['body']>,
  res: Response
) => {
  const newEmployee: Employee = {
    id: data.employees[data.employees.length - 1].id + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  data.setEmployees([...data.employees, newEmployee]);
  eventLogger(`created an new employee ${newEmployee.firstname}`);
  res.status(201).json(newEmployee);
};

// PUT
export const updateEmplyee = (
  req: Request<{}, {}, ReqEmployee['body']>,
  res: Response
) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  // check employee
  if (!employee)
    return res
      .status(400)
      .json({ 'message': `Employees ID ${req.body.id} not found` });
  employee.firstname = req.body.firstname;
  employee.lastname = req.body.lastname;
  const filteredArray = data.employees.map((emp) =>
    emp.id !== employee.id ? emp : employee
  );
  data.setEmployees(filteredArray);
  eventLogger(`employee of id: ${employee.id} updated`);
  res.json(employee);
};

// DELETE
export const deleteEmployee = (
  req: Request<{}, {}, ReqEmployeeId['body']>,
  res: Response
) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  // check employee
  if (!employee)
    return res
      .status(400)
      .json({ 'message': `Employees ID ${req.body.id} not found` });

  const filteredArray = data.employees.filter((emp) => emp.id !== employee.id);
  data.setEmployees(filteredArray);
  eventLogger(
    `employee of id: ${employee.id} firstname: ${employee.firstname} lastname: ${employee.lastname} deleted`
  );
  res.json(employee);
};

// route '/:id'
// GET
export const getEmployee = (req: Request<{ id: string }>, res: Response) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  // check employee
  if (!employee)
    return res
      .status(400)
      .json({ 'message': `Employees ID ${req.body.id} not found` });
  res.json(employee);
};
