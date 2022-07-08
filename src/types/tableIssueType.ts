export interface TableIssueType {
    id: string
    data: Data
}
  
export interface Data {
    completed: boolean
    created: Created
    considerations: string
    priority: string
    issue: string
    addedBy: string
    assignedTo: string
}
  
export interface Created {
    seconds: number
    nanoseconds: number
}