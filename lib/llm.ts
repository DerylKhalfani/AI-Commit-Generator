import OpenAI from "openai";
import {CommitSchema} from "./schema";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function generateCommit(diff: string) {
    const response = await client.chat.completions.create({
        model: "gpt-5-nano",
        messages: [
            {
                role: "system",
                content:
                    "You generate conventional commit messages. You MUST return a JSON object with the following keys: type, scope, subject, body. body MUST be an array of strings. If information is missing, make a reasonable guess."
            },
            {
                role: "user",
                content: "Analyze this git diff and generate a commit message: \n\n${diff}",

            },

        ],
        response_format: {type: "json_object"},

    });
    const content = response.choices[0].message.content;
    let parsed;
    try {
    parsed = CommitSchema.parse(JSON.parse(content!));
    } catch {
    parsed = {
        type: "chore",
        scope: null,
        subject: "update code",
        body: ["Updated code based on recent changes"],
    };
    }


    return {
        ...parsed,
        body: Array.isArray(parsed.body) ? parsed.body : [parsed.body],
      };
      
}