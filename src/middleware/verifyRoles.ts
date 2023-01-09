import { Response, NextFunction } from 'express';
import { VerifyRequest } from './verifyJwt';

const verifyRoles = (...allowedRoles: number[]) => {
  return (req: VerifyRequest, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
