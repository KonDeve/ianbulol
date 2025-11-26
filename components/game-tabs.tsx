"use client"

import { useState } from "react"
import { X, Plus, Search } from "lucide-react"
import type { Game } from "@/types/checklist"

interface GameTabsProps {
  games: Game[]
  activeGameId: string | null
  onSelectGame: (gameId: string) => void
  onAddGame: () => void
  onDeleteGame: (gameId: string) => void
}

export function GameTabs({ games, activeGameId, onSelectGame, onAddGame, onDeleteGame }: GameTabsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4 py-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Game Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {filteredGames.map((game) => (
        <div
          key={game.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-md border whitespace-nowrap transition-colors ${
            activeGameId === game.id
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-background text-muted-foreground hover:text-foreground"
          }`}
        >
          <button onClick={() => onSelectGame(game.id)} className="hover:underline">
            {game.name}
          </button>
          <button
            onClick={() => onDeleteGame(game.id)}
            className="p-1 hover:bg-destructive/20 rounded transition-colors"
            title="Delete game"
          >
            <X size={16} />
          </button>
        </div>
      ))}
        <button
          onClick={onAddGame}
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
        >
          <Plus size={18} />
          Add Game
        </button>
      </div>
    </div>
  )
}
