/*
 * TypeScript/React Syntax Rules:
 * - "use client" = mark this as client-side code (runs in browser, not server)
 * - useState<Type> = create state with type annotation
 * - | = union type (can be one type OR another, like Union[A, B] in Python)
 * - fetch() = make HTTP request (like requests.post() in Python)
 * - JSON.stringify() = convert object to JSON string (like json.dumps() in Python)
 * - try/catch/finally = same as Python's try/except/finally
 */

// Tell Next.js this component runs in the browser (needs interactivity/state)
"use client";

import { useState } from "react";
import CommitInput from "../components/CommitInput";
import CommitResult from "../components/CommitResult";
import { CommitMessage } from "../types/commit";

// Main page component
export default function Home() {
  // State for storing the generated commit message (null = nothing generated yet)
  const [commit, setCommit] = useState<CommitMessage | null>(null);

  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // Function called when user clicks "Generate" button
  const handleGenerate = async (diff: string) => {
    setLoading(true)    // Show loading state
    setCommit(null)     // Clear previous result

    try {
      // Make POST request to our API endpoint
      const res = await fetch("/api/generate-commit",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ diff })  // Convert object to JSON string
        }
      );

      // Parse JSON response
      const data = await res.json();

      // Update state with the generated commit
      setCommit(data);

    } catch (err) {
      // If request fails, log error
      console.log(err)

    } finally {
      // Always runs after try/catch, regardless of success or failure
      setLoading(false)
    }

  };

  return (
    <main>
      <h1>AI Commit Message Generator</h1>

      {/* Render input component, pass our handler function to it */}
      <CommitInput onGenerate={handleGenerate} />

      {/* Show loading state */}
      {loading && <div className="loading">Generating commit message...</div>}

      {/* Only show result if commit exists (conditional rendering) */}
      {commit && <CommitResult commit={commit} />}
    </main>
  );
}
