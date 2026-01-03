export function preprocessDiff(diff: string, maxLines = 200): string {
    const lines = diff.split("\n");

    const relevant = lines.filter(
        // main idea of filtering
        (line) =>
        (line.startsWith("+") || line.startsWith("-")) &&
        !line.startsWith("+++")
    );

    return relevant.slice(0, maxLines).join("\n")
}