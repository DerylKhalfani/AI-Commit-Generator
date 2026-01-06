/*
 * TypeScript Syntax Rules:
 * - @/ = alias for project root directory (configured in tsconfig.json)
 * - const {x} = obj = destructuring (extract property from object)
 * - ! = not operator (like "not" in Python)
 * - typeof = check variable type at runtime
 * - || = OR operator (like "or" in Python)
 */

// This file defines the API endpoint for generating commit messages
// File path = URL path: /app/api/generate-commit/route.ts → /api/generate-commit

import { NextResponse } from "next/server";
import { preprocessDiff } from "@/lib/diff";
import { generateCommit } from "@/lib/llm";

// POST handler for /api/generate-commit endpoint
export async function POST(req: Request) {
    // Extract "diff" from request body (destructuring)
    const { diff } = await req.json();

    // Debug log to see what we received
    console.log("RECEIVED DIFF:", diff);

    // Validate that diff exists and is a string
    if (!diff || typeof diff !== "string") {
        return NextResponse.json(
            { error: "invalid diff" },
            { status: 400 }  // HTTP 400 Bad Request
        );
    }

    // Clean up the diff (remove unnecessary lines)
    const cleaned = preprocessDiff(diff);

    // Generate commit message using AI
    const commit = await generateCommit(cleaned);

    // Return the generated commit as JSON response
    return NextResponse.json(commit)
}