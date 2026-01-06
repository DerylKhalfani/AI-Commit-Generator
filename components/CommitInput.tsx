/*
 * TypeScript/React Syntax Rules:
 * - useState = React hook for managing component state (triggers re-render when changed)
 * - type = define custom type for props (parameters passed to component)
 * - (x) => y = arrow function (like lambda in Python)
 * - JSX = HTML-like syntax in JavaScript/TypeScript
 * - {variable} = insert JavaScript expression in JSX
 * - onChange/onClick = event handlers (functions that run on user interaction)
 */

import { useState } from "react"

// Define the type for this component's props (like function parameters)
// This component expects to receive an onGenerate function
type CommitInputProps = {
    onGenerate: (diff: string) => void;  // Function that takes string, returns nothing
};

// React component for the input form
export default function CommitInput({ onGenerate }: CommitInputProps) {
    // Create state variable for the diff text
    // diff = current value, setDiff = function to update it
    const [diff, setDiff] = useState("");

    return (
      <div>
        {/* Textarea where user pastes their git diff */}
        <textarea
          value={diff}                              // Controlled input: value comes from state
          onChange={(e) => setDiff(e.target.value)} // Update state when user types
          placeholder="Paste git diff here"
        />

        {/* Button that calls onGenerate with current diff value */}
        <button onClick={() => onGenerate(diff)}>
          Generate
        </button>
      </div>
    );
}