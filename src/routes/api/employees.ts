import express, { Request, Response } from 'express';
import validateResource from '../../middleware/validateResource';
import { verifyJwt } from '../../middleware/verifyJwt';
import * as employeesController from './../../controllers/employees.controller';
import {
  employeeSchema,
  employeeNameSchema,
  employeeIdSchema,
} from './../../schema/employee.schema';
import { RolesList } from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';

const router = express.Router();

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(RolesList.Admin, RolesList.Editor),
    validateResource(employeeNameSchema),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(RolesList.Admin, RolesList.Editor),
    validateResource(employeeSchema),
    employeesController.updateEmplyee
  )
  .delete(
    verifyRoles(RolesList.Admin),
    validateResource(employeeIdSchema),
    employeesController.deleteEmployee
  );

router.route('/:id').get(employeesController.getEmployee);

export { router };
