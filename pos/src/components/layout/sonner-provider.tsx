"use client"

import { Toaster } from "sonner"

export function SonnerProvider() {
    return (
        <Toaster position="top-center" expand closeButton richColors />
    )
}

