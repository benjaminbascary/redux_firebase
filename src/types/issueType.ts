export type IssueType = {
    addedBy: string | undefined;
    issue: string;
    assignedTo: string;
    considerations: string;
    priority: "low" | "medium" | "high"
    completed: boolean;
}