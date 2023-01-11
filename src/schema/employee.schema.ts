import { z } from 'zod';

// route '/' schemas
// for POST
export const employeeNameSchema = z.object({
  firstname: z.string({
    required_error: 'firstname is required',
  }),
  lastname: z.string({
    required_error: 'lastname is required',
  }),
});

// for DELETE
export const employeeIdSchema = z.object({
  id: z
    .number({
      required_error: 'id is required',
    })
    .gt(0),
});

// for get
export const employeeStringIdSchema = z.object({
  id: z
    .string({
      required_error: 'id is required',
    })
    .refine((data) => !Number.isNaN(parseInt(data)), {
      message: 'not a valid id',
    }),
});

// for PUT
export const employeeSchema = employeeIdSchema.merge(employeeNameSchema);

export type ReqEmployee = z.infer<typeof employeeSchema>;
export type ReqEmployeeName = z.infer<typeof employeeNameSchema>;
export type ReqEmployeeId = z.infer<typeof employeeIdSchema>;
export type ReqEmployeeStringId = z.infer<typeof employeeStringIdSchema>;
