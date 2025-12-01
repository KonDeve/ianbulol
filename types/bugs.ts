export interface Bug {
  id: string
  gameId: string
  gameName?: string
  description: string
  screenshotUrl: string | null
  status: "open" | "in-progress" | "done" | "wont-fix"
  createdAt: number
  updatedAt: number
}

export type BugStatus = Bug["status"]
