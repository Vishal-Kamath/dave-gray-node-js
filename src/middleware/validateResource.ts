import { errorLogger } from './logEvents';
import { NextFunction, Request, Response } from 'express';
import { z, AnyZodObject } from 'zod';

const validateResource =
  (
    paramsSchema: AnyZodObject,
    bodySchema: AnyZodObject,
    querySchema: AnyZodObject
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
      params: paramsSchema,
      body: bodySchema,
      query: querySchema,
    });
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
