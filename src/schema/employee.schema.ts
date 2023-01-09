import { z } from 'zod';

// route '/' schemas
// for POST
export const employeeNameSchema = z.object({
  body: z.object({
    firstname: z.string({
      required_error: 'firstname is required',
    }),
    lastname: z.string({
      required_error: 'lastname is required',
    }),
  }),
});

// for DELETE
export const employeeIdSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: 'id is required',
      })
      .gt(0),
  }),
});

// for PUT
export const employeeSchema = z.object({
  body: z.object({
    id: z
      .number({
        required_error: 'id is required',
      })
      .gt(0),
    firstname: z.string({
      required_error: 'firstname is required',
    }),
    lastname: z.string({
      required_error: 'lastname is required',
    }),
  }),
});

export type ReqEmployee = z.infer<typeof employeeSchema>;
export type ReqEmployeeName = z.infer<typeof employeeNameSchema>;
export type ReqEmployeeId = z.infer<typeof employeeIdSchema>;
