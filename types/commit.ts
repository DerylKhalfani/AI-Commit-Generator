export type CommitMessage = {
    type: string,
    scope?: string,
    subject: string,
    body: string[]
}