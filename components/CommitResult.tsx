/*
 * TypeScript/React Syntax Rules:
 * - && = conditional rendering (if left is truthy, show right)
 * - .map() = transform array (like list comprehension in Python)
 * - key= = unique identifier for list items (required by React)
 */

import { CommitMessage } from "../types/commit";

// Define props type: this component receives a commit object
type CommitResultsType = {
  commit: CommitMessage;
};

// Component to display the generated commit message
export default function CommitResult({ commit }: CommitResultsType) {
  return (
    <div>
      {/* Display commit title in format: type(scope): subject */}
      <h3>
        {commit.type}
        {commit.scope && `(${commit.scope})`}: {commit.subject}
        {/* commit.scope && ... means: only show scope if it exists */}
      </h3>

      {/* Display commit body as bulleted list */}
      <ul>
        {commit.body.map((line, index) => (
          // For each line in body array, create a list item
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
}