/*
 * TypeScript Syntax Rules:
 * - import X from "y" = default import (import main thing from module)
 * - import {x} from "y" = named import (import specific item)
 * - new X() = create instance of class (same as Python)
 * - process.env = environment variables (like os.environ in Python)
 * - async/await = same as Python's async/await
 * - `template ${variable}` = f-string (like f"text {variable}" in Python)
 * - ! = tell TypeScript "trust me, this is not null"
 * - let = mutable variable (can be reassigned)
 * - try/catch = try/except in Python
 * - ...spread = unpack object (like **dict in Python)
 * - x ? y : z = ternary operator (like: y if x else z in Python)
 */

import OpenAI from "openai";
import {CommitSchema} from "./schema";

// Initialize OpenAI client with API key from environment variable
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Generate commit message from git diff using AI
export async function generateCommit(diff: string) {
    // Call OpenAI API to analyze the diff
    const response = await client.chat.completions.create({
        model: "gpt-5-nano",  // NOTE: This model doesn't exist! Should be "gpt-4o-mini" or "gpt-4o"
        messages: [
            {
                role: "system",
                content:
                    "You generate conventional commit messages. You MUST return a JSON object with the following keys: type, scope, subject, body. body MUST be an array of strings. If information is missing, make a reasonable guess."
            },
            {
                role: "user",
                content: `Analyze this git diff:\n\n${diff}`,  // Template string with variable

            },

        ],
        response_format: {type: "json_object"},  // Force JSON response format

    });

    // Extract the AI's response text
    const content = response.choices[0].message.content;

    // Variable to store parsed result
    let parsed;

    // Try to parse and validate the response
    try {
        // Parse JSON string and validate against schema
        parsed = CommitSchema.parse(JSON.parse(content!));
    } catch {
        // If parsing fails, use fallback values
        parsed = {
            type: "chore",
            scope: null,
            subject: "update code",
            body: ["Updated code based on recent changes"],
        };
    }

    // Return parsed data, ensuring body is always an array
    return {
        ...parsed,  // Spread operator: unpack all properties from parsed object
        body: Array.isArray(parsed.body) ? parsed.body : [parsed.body],  // If body is not array, make it one
    };

}