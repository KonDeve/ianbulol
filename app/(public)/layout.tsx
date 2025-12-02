import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bugs & Errors - View Only",
  description: "View reported bugs and errors (read-only)",
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 dark:bg-slate-900 overflow-auto">
      {children}
    </div>
  )
}
