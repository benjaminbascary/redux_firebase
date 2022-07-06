export type IssueType = {
    addedBy: string | undefined;
    issue: string;
    assignedTo: string;
    considerations: string;
    priority: "Low" | "Medium" | "High" | "No deadline",
    created: TimeStamp,
    completed: boolean
}

// Tymestamp type:

export interface TimeStamp {
    seconds: number
    nanoseconds: number
  }