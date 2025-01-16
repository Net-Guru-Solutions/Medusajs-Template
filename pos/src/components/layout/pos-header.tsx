import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/layout/mode-toggle'

export function POSHeader() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">FrontlineMilitary POS</h1>
            <div className="flex items-center gap-4">
                <span>Welcome, {user?.name}</span>
                <Button onClick={handleLogout} variant="secondary">Logout</Button>
                <ModeToggle />
            </div>
        </header>
    )
}

