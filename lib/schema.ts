// defines a valid commit message looks like

import {z} from "zod";

export const CommitSchema = z.object({
    type: z.string(),
    scope: z.string().nullable().optional(),
    subject: z.string(),
    body: z.array(z.string()).or(z.string()),
});

export type CommitSchemaType = z.infer<typeof CommitSchema>;