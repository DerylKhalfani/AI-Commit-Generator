/*
 * TypeScript Syntax Rules:
 * - function name(param: type): returnType = function definition
 * - const = declare variable (like Python variable)
 * - .filter() = keep items that match condition (like list comprehension with if)
 * - (x) => expression = arrow function (like lambda in Python)
 * - .slice(start, end) = get subset of array (like [start:end] in Python)
 * - .join() = combine array into string (same as Python's join())
 */

// Clean up git diff to keep only the important changed lines
export function preprocessDiff(diff: string, maxLines = 200): string {
    // Split diff into individual lines
    const lines = diff.split("\n");

    // Keep only lines that show actual changes (+ or -)
    // Filter out file header lines (+++ or ---)
    const relevant = lines.filter(
        (line) =>                                           // Arrow function: for each line
        (line.startsWith("+") || line.startsWith("-")) &&  // Line shows addition or deletion
        !line.startsWith("+++")                            // But not a file header
    );

    // Take first maxLines and combine back into string
    return relevant.slice(0, maxLines).join("\n")
}