"use client"

import { Toaster } from "sonner"

export function SonnerProvider() {
    return (
        <Toaster position="top-center" toastOptions={{ style: { background: "var(--background)", color: "var(--foreground)", border: "1px solid var(--border)", }, }} richColors />
    )
}

