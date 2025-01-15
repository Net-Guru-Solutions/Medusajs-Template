import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { ModeToggle } from "./mode-toggle"

export function POSHeader() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
            <h1 className="text-2xl font-bold">FrontlineMilitary POS</h1>
            <ModeToggle />
            <div className="flex items-center gap-4">
                <span>{user?.name} ({user?.role})</span>
                <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </div>
        </header>
    )
}

