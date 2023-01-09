import { errorLogger } from './logEvents';
import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });
      next();
    } catch (err: any) {
      errorLogger(err);
      res.status(500).send(err);
    }
  };

export default validateResource;
