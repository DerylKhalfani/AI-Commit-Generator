/*
 * TypeScript Syntax Rules:
 * - import {x} from "y" = import specific items (like: from y import x)
 * - const = constant variable (standard way to declare variables)
 * - z.object() = define validation schema (like Pydantic in Python)
 * - z.infer<typeof X> = automatically create type from schema
 */

// This file defines what a valid commit message looks like
// Uses Zod library for validation (similar to Pydantic in Python)

import {z} from "zod";

// Define validation schema for commit messages
export const CommitSchema = z.object({
    type: z.string(),                           // Must be a string
    scope: z.string().nullable().optional(),    // Can be string, null, or undefined
    subject: z.string(),                        // Must be a string
    body: z.array(z.string()).or(z.string()),  // Can be array of strings OR single string
});

// Automatically create TypeScript type from the schema above
export type CommitSchemaType = z.infer<typeof CommitSchema>;