import { useState } from "react"

// Props for CommitInput:
// onGenerate is a function that receives the git diff as a string
type CommitInputProps = {
    onGenerate: (diff: string) => void;
  };
  
  export default function CommitInput({ onGenerate }: CommitInputProps) {
    const [diff,setDiff] = useState("");

    return (
      <div>
        {/* Text area where user pastes the git diff */}
        <textarea value={diff}
         onChange= {(e) => setDiff(e.target.value)}
         placeholder="Paste git diff here" />
  
        {/* Button that triggers commit generation */}
        {/* For now, we pass an empty string as mock input */}
        <button onClick={() => onGenerate(diff)}>
          Generate
        </button>
      </div>
    );
  }
  
  