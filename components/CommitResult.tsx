import { CommitMessage } from "../types/commit";

// Props for CommitResult:
// commit contains the generated commit message data
type CommitResultsType = {
  commit: CommitMessage;
};

export default function CommitResult({ commit }: CommitResultsType) {
  return (
    <div>
      {/* Commit title: type(scope): subject */}
      <h3>
        {commit.type}
        {commit.scope && `(${commit.scope})`}: {commit.subject}
      </h3>

      {/* Commit body shown as bullet points */}
      <ul>
        {commit.body.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
}