"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Employee } from '@/types'

interface AuthContextType {
    user: Employee | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Employee | null>(null)

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (email: string, password: string) => {
        // This is a mock login function. Replace with actual API call in production.
        if (email === 'scottjones@netgurusolutions.co.uk' && password === 'yjfsq53bjgzici355zwfyo39pxf6vj0c') {
            const user: Employee = { id: '1', name: 'Scott Jones', role: 'developer' }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        } else if (email === 'deannajones@netgurusolutions.co.uk' && password === 'Alltheballs!2') {
            const user: Employee = { id: '2', name: 'Jane Smith', role: 'manager' }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        } else if (email === 'info@frontlinemilitary.co.uk' && password === '4f1cmoVJ2RZv1h') {
            const user: Employee = { id: '2', name: 'Jane Smith', role: 'manager' }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            throw new Error('Invalid credentials')
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

