import express, { Request, Response } from 'express';
import validateResource from '../../middleware/validateResource';
import { verifyJwt } from '../../middleware/verifyJwt';
import * as employeesController from './../../controllers/employees.controller';
import {
  employeeSchema,
  employeeNameSchema,
  employeeIdSchema,
} from './../../schema/employee.schema';
const router = express.Router();

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    validateResource(employeeNameSchema),
    employeesController.createNewEmployee
  )
  .put(validateResource(employeeSchema), employeesController.updateEmplyee)
  .delete(
    validateResource(employeeIdSchema),
    employeesController.deleteEmployee
  );

router.route('/:id').get(employeesController.getEmployee);

export { router };
