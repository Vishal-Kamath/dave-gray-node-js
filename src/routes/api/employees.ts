import express from 'express';
import validateResource from '../../middleware/validateResource';
import * as employeesController from './../../controllers/employees.controller';
import {
  employeeSchema,
  employeeNameSchema,
  employeeIdSchema,
  employeeStringIdSchema,
} from './../../schema/employee.schema';
import { RolesList } from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';
import { blankSchema } from '../../schema/blank.schema';

const router = express.Router();

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(RolesList.Admin, RolesList.Editor),
    validateResource(blankSchema, employeeNameSchema, blankSchema),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(RolesList.Admin, RolesList.Editor),
    validateResource(blankSchema, employeeSchema, blankSchema),
    employeesController.updateEmplyee
  )
  .delete(
    verifyRoles(RolesList.Admin),
    validateResource(blankSchema, employeeIdSchema, blankSchema),
    employeesController.deleteEmployee
  );

router
  .route('/:id')
  .get(
    validateResource(employeeStringIdSchema, blankSchema, blankSchema),
    employeesController.getEmployee
  );

export { router };
