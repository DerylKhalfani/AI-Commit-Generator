import { NextResponse } from "next/server";
import { preprocessDiff } from "@/lib/diff";
import { generateCommit } from "@/lib/llm";

export async function POST(req: Request) {
    const { diff } = await req.json();
    console.log("RECEIVED DIFF:", diff);


    if (!diff || typeof diff !== "string") {
        return NextResponse.json(
            { error: "invalid diff" },
            { status: 400 }
        );
    }

    const cleaned = preprocessDiff(diff);
    const commit = await generateCommit(cleaned);

    return NextResponse.json(commit)
}