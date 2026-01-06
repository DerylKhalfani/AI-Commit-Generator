/*
 * TypeScript Syntax Rules:
 * - export = make available to other files (like in Python)
 * - type = define a custom type (like TypedDict in Python)
 * - string = text type (like str in Python)
 * - string[] = array of strings (like list[str] in Python)
 * - ? = optional field (like Optional[str] in Python)
 */

// Define the structure of a commit message object
export type CommitMessage = {
    type: string,        // Commit type: "feat", "fix", "chore", etc.
    scope?: string,      // Optional scope (? means it can be undefined)
    subject: string,     // Short description
    body: string[]       // Array of detailed description lines
}