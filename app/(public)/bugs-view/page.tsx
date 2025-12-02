"use client"

import { useState, useEffect } from "react"
import { Bug } from "lucide-react"
import { BugsTableViewOnly } from "@/components/bugs-table-view-only"
import type { Game } from "@/types/checklist"
import type { Bug as BugType } from "@/types/bugs"

export default function BugsViewPage() {
  const [bugs, setBugs] = useState<BugType[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch bugs
    fetch("/api/bugs")
      .then((res) => res.json())
      .then((data) => {
        setBugs(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching bugs:", err)
        setIsLoading(false)
      })

    // Fetch games for the dropdown
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Error fetching games:", err))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <Bug className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bugs & Errors</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">View reported issues (Read-only)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm font-medium">
              View Only Mode
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-red-200 dark:border-red-800 border-t-red-600 dark:border-t-red-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading bugs...</p>
            </div>
          </div>
        ) : (
          <BugsTableViewOnly
            bugs={bugs}
            games={games.map(g => ({ id: g.id, name: g.name }))}
          />
        )}
      </div>
    </div>
  )
}
