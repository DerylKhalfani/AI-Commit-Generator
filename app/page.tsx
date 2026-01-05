"use client";

import { useState } from "react";
import CommitInput from "../components/CommitInput";
import CommitResult from "../components/CommitResult";
import { CommitMessage } from "../types/commit";

export default function Home() {
  // State holding the generated commit message
  // null means no commit has been generated yet
  const [commit, setCommit] = useState<CommitMessage | null>(null);
  const [loading, setLoading] = useState(false);

  // Called when user clicks "Generate"
  // diff will later contain the git diff text
  const handleGenerate = async (diff: string) => {
    setLoading(true)
    setCommit(null)
    
    try {
      const res = await fetch("/api/generate-commit",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ diff })
        }
      );

      const data = await res.json();
      setCommit(data);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }

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
