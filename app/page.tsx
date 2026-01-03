"use client";

import { useState } from "react";
import CommitInput from "../components/CommitInput";
import CommitResult from "../components/CommitResult";
import { CommitMessage } from "../types/commit";

export default function Home() {
  // State holding the generated commit message
  // null means no commit has been generated yet
  const [commit, setCommit] = useState<CommitMessage | null>(null);

  // Called when user clicks "Generate"
  // diff will later contain the git diff text
  const handleGenerate = (diff: string) => {
    // Mock commit message for Phase 1
    const mockCommit: CommitMessage = {
      type: "feat",
      scope: "auth",
      subject: "add login support",
      body: [
        "Added basic login logic",
        "Handled user authentication flow",
      ],
    };

    // Save commit message to state
    setCommit(mockCommit);
  };

  return (
    <main>
      {/* Input component */}
      <CommitInput onGenerate={handleGenerate} />

      {/* Show result only after commit is generated */}
      {commit && <CommitResult commit={commit} />}
    </main>
  );
}
