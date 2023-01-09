import express, { Request, Response } from 'express';
import path from 'path';
import { employeesData } from '../../data/employees';

const data = {
  employees: employeesData,
};
const router = express.Router();

router
  .route('/')
  .get((req: Request, res: Response) => {
    res.json(data.employees);
  })
  .post((req: Request, res: Response) => {})
  .put((req: Request, res: Response) => {})
  .delete((req: Request, res: Response) => {});

// request with id param
type IdRequest = Request<{ id: number }>;
router.route('/:id').get((req: IdRequest, res: Response) => {
  res.send(req.params.id);
});

export { router };
